import { Metadata } from 'next';

import { PERMISSIONS } from '~/common/const/permission';
import { PageScreen } from '~/components/layouts/page';
import { url } from '~/lib/utils/converter';
import { CV } from '~/modules/cv/cv.type';
import { Component } from './_components';

export const metadata: Metadata = {
  title: 'Analyze CV',
};

export const permissions = [PERMISSIONS.CLIENT.READ_CV];
const breadcrumbItems = (clientId: string, id: string) => [
  {
    title: 'Home',
    url: url('/[clientId]', { clientId }),
    active: false,
  },
  {
    title: 'Dashboard',
    url: url('/[clientId]/dashboard', { clientId }),
    active: false,
  },
  {
    title: 'Analyze CV',
    url: url('/[clientId]/analyze', { clientId }),
    active: false,
  },
  {
    title: 'Result',
    url: url('/[clientId]/analyze/[id]', { clientId, id }),
    active: true,
  },
];

type Props = PageProps<'/[clientId]/analyze/[id]'>;

export default async function Page({ params }: Props) {
  const { clientId, id } = await params;
  const breadcrumbs = breadcrumbItems(clientId, id);
  const data: CV = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    user_id: 1,
    address: '123 Main St, Anytown, CA 12345',
    linkedin: 'https://www.linkedin.com/in/johndoe/',
    about:
      'I am a software engineer with 5+ years of experience in building scalable applications using modern technologies such as Node.js, React, and GraphQL.',
    interest: ['Reading', 'Traveling', 'Gaming'],
    skill: ['Node.js', 'React', 'GraphQL', 'TypeScript', 'JavaScript'],
    education: [
      {
        major: 'Computer Science',
        name: 'University of California, Berkeley',
      },
    ],
    experience: [
      {
        role: 'Software Engineer',
        company: 'ABC Company',
      },
    ],
    projects: [
      {
        title: 'Personal Website',
        description: 'A personal website built using Next.js and TypeScript.',
      },
    ],
    certificate: [
      {
        title: 'Certified Scrum Master',
        issuer: 'Scrum Alliance',
        year: 2020,
        url: 'https://www.scrumalliance.org/',
      },
    ],
  };
  return (
    <PageScreen title="Analyze CV" breadcrumbs={breadcrumbs}>
      <Component data={data} />
    </PageScreen>
  );
}
