import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcrypt';
import { PrismaClient } from '~/generated/prisma/client';
import 'dotenv/config';
import { PERMISSIONS } from '~/common/const/permission';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

export async function userSeeder() {
  console.log('⚡ Seeding deterministic roles/permissions...');

  // --- Insert Roles ---
  await prisma.role.createMany({
    data: [{ name: 'Client' }, { name: 'Admin' }],
  });

  const insertedRoles = await prisma.role.findMany();
  const roleIds = Object.fromEntries(insertedRoles.map((r) => [r.name, r.id]));

  // --- Insert Permissions ---
  const permissionsData = [
    { key: PERMISSIONS.ADMIN.CREATE_CLIENT, name: 'Create Client' },
    { key: PERMISSIONS.ADMIN.READ_CLIENT, name: 'Read Client' },
    { key: PERMISSIONS.ADMIN.UPDATE_CLIENT, name: 'Update Client' },
    { key: PERMISSIONS.ADMIN.DELETE_CLIENT, name: 'Delete Client' },

    { key: PERMISSIONS.ADMIN.CREATE_CV, name: 'Create CV' },
    { key: PERMISSIONS.ADMIN.READ_CV, name: 'Read CV' },
    { key: PERMISSIONS.ADMIN.UPDATE_CV, name: 'Update CV' },
    { key: PERMISSIONS.ADMIN.DELETE_CV, name: 'Delete CV' },

    { key: PERMISSIONS.ADMIN.READ_ANALYZE_CV, name: 'Read History Analysis CV' },
    { key: PERMISSIONS.ADMIN.SINGLE_ANALYZE_CV, name: 'Single Analysis CV' },
    { key: PERMISSIONS.ADMIN.BULK_ANALYZE_CV, name: 'Bulk Analysis CV' },

    { key: PERMISSIONS.ADMIN.CREATE_CHATS, name: 'Create Chats' },
    { key: PERMISSIONS.ADMIN.READ_CHATS, name: 'Read Chats' },
    { key: PERMISSIONS.ADMIN.UPDATE_CHATS, name: 'Update Chats' },
    { key: PERMISSIONS.ADMIN.DELETE_CHATS, name: 'Delete Chats' },

    { key: PERMISSIONS.ADMIN.CREATE_AGENT, name: 'Create Agents' },
    { key: PERMISSIONS.ADMIN.READ_AGENT, name: 'Read Agents' },
    { key: PERMISSIONS.ADMIN.UPDATE_AGENT, name: 'Update Agents' },
    { key: PERMISSIONS.ADMIN.DELETE_AGENT, name: 'Delete Agents' },

    { key: PERMISSIONS.ADMIN.CREATE_MESSAGES, name: 'Create Messages' },
    { key: PERMISSIONS.ADMIN.READ_MESSAGES, name: 'Read Messages' },
    { key: PERMISSIONS.ADMIN.UPDATE_MESSAGES, name: 'Update Messages' },
    { key: PERMISSIONS.ADMIN.DELETE_MESSAGES, name: 'Delete Messages' },
  ] as const;

  await prisma.permissions.createMany({ data: [...permissionsData] });

  type PermissionKey = (typeof permissionsData)[number]['key'];

  type PermissionIds = {
    [k in PermissionKey]: number;
  };

  const insertedPermissions = await prisma.permissions.findMany();
  const permissionIds = Object.fromEntries(insertedPermissions.map((p) => [p.key, p.id])) as PermissionIds;

  // --- Insert Users ---
  const [clientPass, adminPass] = await Promise.all([bcrypt.hash('client_pass', 10), bcrypt.hash('admin_pass', 10)]);

  await prisma.user.createMany({
    data: [
      { name: 'Client', email: 'client@gmail.com', password: clientPass },
      { name: 'Admin', email: 'admin@gmail.com', password: adminPass },
    ],
  });

  const insertedUsers = await prisma.user.findMany();
  const userIds = Object.fromEntries(insertedUsers.map((u) => [u.email, u.id]));

  // --- Insert user_roles ---
  await prisma.userRoles.createMany({
    data: [
      { user_id: userIds['client@gmail.com'], role_id: roleIds['Client'] },
      { user_id: userIds['admin@gmail.com'], role_id: roleIds['Admin'] },
    ],
  });

  // --- Insert role_permissions ---
  await prisma.rolePermissions.createMany({
    data: [
      // Admin Permissions
      { role_id: roleIds.Admin, permission_id: permissionIds['client:read'] },
      { role_id: roleIds.Admin, permission_id: permissionIds['client:update'] },
      { role_id: roleIds.Admin, permission_id: permissionIds['client:delete'] },
      { role_id: roleIds.Admin, permission_id: permissionIds['client:create'] },

      { role_id: roleIds.Admin, permission_id: permissionIds['messages:create'] },
      { role_id: roleIds.Admin, permission_id: permissionIds['messages:read'] },
      { role_id: roleIds.Admin, permission_id: permissionIds['messages:update'] },
      { role_id: roleIds.Admin, permission_id: permissionIds['messages:delete'] },

      { role_id: roleIds.Admin, permission_id: permissionIds['cv:create'] },
      { role_id: roleIds.Admin, permission_id: permissionIds['cv:read'] },
      { role_id: roleIds.Admin, permission_id: permissionIds['cv:update'] },
      { role_id: roleIds.Admin, permission_id: permissionIds['cv:delete'] },

      { role_id: roleIds.Admin, permission_id: permissionIds['cv:read_analyze'] },
      { role_id: roleIds.Admin, permission_id: permissionIds['cv:single_analyze'] },
      { role_id: roleIds.Admin, permission_id: permissionIds['cv:bulk_analyze'] },

      { role_id: roleIds.Admin, permission_id: permissionIds['chat:create'] },
      { role_id: roleIds.Admin, permission_id: permissionIds['chat:read'] },
      { role_id: roleIds.Admin, permission_id: permissionIds['chat:update'] },
      { role_id: roleIds.Admin, permission_id: permissionIds['chat:delete'] },

      { role_id: roleIds.Admin, permission_id: permissionIds['agent:create'] },
      { role_id: roleIds.Admin, permission_id: permissionIds['agent:read'] },
      { role_id: roleIds.Admin, permission_id: permissionIds['agent:update'] },
      { role_id: roleIds.Admin, permission_id: permissionIds['agent:delete'] },

      // Client Permissions
      { role_id: roleIds.Client, permission_id: permissionIds['cv:create'] },
      { role_id: roleIds.Client, permission_id: permissionIds['cv:read'] },
      { role_id: roleIds.Client, permission_id: permissionIds['cv:update'] },
      { role_id: roleIds.Client, permission_id: permissionIds['cv:delete'] },

      { role_id: roleIds.Client, permission_id: permissionIds['cv:read_analyze'] },
      { role_id: roleIds.Client, permission_id: permissionIds['cv:single_analyze'] },
      { role_id: roleIds.Client, permission_id: permissionIds['cv:bulk_analyze'] },

      { role_id: roleIds.Client, permission_id: permissionIds['chat:create'] },
      { role_id: roleIds.Client, permission_id: permissionIds['chat:read'] },
      { role_id: roleIds.Client, permission_id: permissionIds['chat:update'] },
      { role_id: roleIds.Client, permission_id: permissionIds['chat:delete'] },

      { role_id: roleIds.Client, permission_id: permissionIds['agent:create'] },
      { role_id: roleIds.Client, permission_id: permissionIds['agent:read'] },
      { role_id: roleIds.Client, permission_id: permissionIds['agent:update'] },
      { role_id: roleIds.Client, permission_id: permissionIds['agent:delete'] },

      { role_id: roleIds.Client, permission_id: permissionIds['messages:create'] },
      { role_id: roleIds.Client, permission_id: permissionIds['messages:read'] },
      { role_id: roleIds.Client, permission_id: permissionIds['messages:update'] },
      { role_id: roleIds.Client, permission_id: permissionIds['messages:delete'] },
    ],
  });

  console.log('✅ Seeding User roles/permissions done!');
}
