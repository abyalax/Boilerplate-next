import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcrypt';
import { PrismaClient } from '~/generated/prisma/client';

import 'dotenv/config';
import { mockCVs } from './data.';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log('⚡ Seeding deterministic roles/permissions...');

  // --- Clean DB (TRUNCATE tables) ---
  // Prisma tidak punya truncate, tapi bisa pakai raw SQL
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE 
      "role_permissions",
      "user_roles",
      "users",
      "permissions",
      "roles",
      "cv"
    RESTART IDENTITY CASCADE;
  `);

  // --- Insert Roles ---
  await prisma.roles.createMany({
    data: [{ name: 'Client' }, { name: 'Admin' }],
  });

  const insertedRoles = await prisma.roles.findMany();
  const roleIds = Object.fromEntries(insertedRoles.map((r) => [r.name, r.id]));

  // --- Insert Permissions ---
  const permissionsData = [
    { key: 'client:read', name: 'Read Client' },
    { key: 'client:create', name: 'Create Client' },
    { key: 'client:update', name: 'Update Client' },
    { key: 'client:delete', name: 'Delete Client' },
    { key: 'client:*', name: 'Manage Client' },

    { key: 'cv:create', name: 'Create CV' },
    { key: 'cv:read', name: 'Read CV' },
    { key: 'cv:update', name: 'Update CV' },
    { key: 'cv:delete', name: 'Delete CV' },

    { key: 'cv:read_analyze', name: 'Read History Analysis CV' },
    { key: 'cv:single_analyze', name: 'Single Analysis CV' },
    { key: 'cv:bulk_analyze', name: 'Bulk Analysis CV' },

    { key: 'job_desc:create', name: 'Create Job Description' },
    { key: 'job_desc:update', name: 'Update Job Description' },
    { key: 'job_desc:read', name: 'Read Job Description' },
    { key: 'job_desc:delete', name: 'Delete Job Description' },
  ];

  await prisma.permissions.createMany({ data: permissionsData });

  const insertedPermissions = await prisma.permissions.findMany();
  const permissionIds = Object.fromEntries(insertedPermissions.map((p) => [p.key, p.id]));

  // --- Insert Users ---
  const [clientPass, adminPass] = await Promise.all([bcrypt.hash('client_pass', 10), bcrypt.hash('admin_pass', 10)]);

  await prisma.users.createMany({
    data: [
      { name: 'Client', email: 'client@gmail.com', password: clientPass },
      { name: 'Admin', email: 'admin@gmail.com', password: adminPass },
    ],
  });

  const insertedUsers = await prisma.users.findMany();
  const userIds = Object.fromEntries(insertedUsers.map((u) => [u.email, u.id]));

  // --- Insert user_roles ---
  await prisma.user_roles.createMany({
    data: [
      { userId: userIds['client@gmail.com'], roleId: roleIds['Client'] },
      { userId: userIds['admin@gmail.com'], roleId: roleIds['Admin'] },
    ],
  });

  // --- Insert role_permissions ---
  await prisma.role_permissions.createMany({
    data: [
      // Client Permissions
      { roleId: roleIds.Client, permissionId: permissionIds['cv:create'] },
      { roleId: roleIds.Client, permissionId: permissionIds['cv:read'] },
      { roleId: roleIds.Client, permissionId: permissionIds['cv:update'] },
      { roleId: roleIds.Client, permissionId: permissionIds['cv:delete'] },

      { roleId: roleIds.Client, permissionId: permissionIds['job_desc:create'] },
      { roleId: roleIds.Client, permissionId: permissionIds['job_desc:update'] },
      { roleId: roleIds.Client, permissionId: permissionIds['job_desc:read'] },
      { roleId: roleIds.Client, permissionId: permissionIds['job_desc:delete'] },

      { roleId: roleIds.Client, permissionId: permissionIds['cv:read_analyze'] },
      { roleId: roleIds.Client, permissionId: permissionIds['cv:single_analyze'] },
      { roleId: roleIds.Client, permissionId: permissionIds['cv:bulk_analyze'] },

      // Admin Permissions
      { roleId: roleIds.Admin, permissionId: permissionIds['client:read'] },
      { roleId: roleIds.Admin, permissionId: permissionIds['client:update'] },
      { roleId: roleIds.Admin, permissionId: permissionIds['client:delete'] },
      { roleId: roleIds.Admin, permissionId: permissionIds['client:create'] },
      { roleId: roleIds.Admin, permissionId: permissionIds['client:*'] },
    ],
  });

  // --- Insert CV (mockCVs imported) ---
  await prisma.cv.createMany({
    data: mockCVs,
  });

  console.log('✅ Seeding User roles/permissions done!');
}

main()
  .then(async () => {
    console.log('✅ Seed data successfully created');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
