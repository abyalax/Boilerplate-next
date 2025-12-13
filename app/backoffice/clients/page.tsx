import { Metadata } from 'next';
import { PERMISSIONS } from '~/common/const/permission';
import { MetaRequest } from '~/common/types/meta';
import { PageScreen } from '~/components/layouts/page';
import { getQueryClient } from '~/lib/query/client';
import { User } from '~/modules/users/users.type';
import { Component } from './_components';

export const metadata: Metadata = {
  title: 'Admin Client Management | Admin Dashboard',
  description: 'Manage client accounts, roles, and permissions in the admin dashboard',
  keywords: 'clients, management, admin, roles, permissions',
};

export const permissions = [PERMISSIONS.ADMIN.READ_CLIENT];

const breadcrumbItems = [
  {
    title: 'Home',
    url: '/',
    active: false,
  },
  {
    title: 'Dashboard',
    url: '/backoffice',
    active: false,
  },
  {
    title: 'Client Managements',
    url: '/backoffice/clients',
    active: true,
  },
];

export default async function Page() {
  return (
    <PageScreen title="Client Managements" breadcrumbs={breadcrumbItems}>
      <Component />
    </PageScreen>
  );
}
