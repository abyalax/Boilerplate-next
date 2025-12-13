import { Metadata } from 'next';

import { PageScreen } from '~/components/layouts/page';

import { Component } from './_components';

export const metadata: Metadata = {
  title: 'Create CV | Admin Dashboard',
  description: 'Add a new CV and assign roles & permissions in the system.',
  keywords: ['create CV', 'admin', 'dashboard', 'roles', 'permissions'],
  openGraph: {
    title: 'Create CV - Admin Dashboard',
    description: 'Add a new CV and assign roles & permissions in the system.',
    type: 'website',
    url: '/admin/CV/create',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Create CV Page',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Create CV - Admin Dashboard',
    description: 'Add a new CV and assign roles & permissions in the system.',
    images: ['/og-image.png'],
  },
};

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
    active: false,
  },
  {
    title: 'Create Client',
    url: '/backoffice/clients/create',
    active: true,
  },
];

export default function Page() {
  return (
    <PageScreen title="Create Client" breadcrumbs={breadcrumbItems}>
      <Component />
    </PageScreen>
  );
}
