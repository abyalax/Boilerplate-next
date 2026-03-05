import { Metadata } from 'next';
import { Component } from './_components';

export const metadata: Metadata = {
  title: 'QR Code | Next Boilerplate',
  description: 'Welcome Access all your important information and features.',
};

type Props = PageProps<'/qrcode/[clientId]/[cvId]'>;

export default async function Page({ params }: Readonly<Props>) {
  const { clientId, cvId } = await params;
  return <Component clientId={clientId} cvId={cvId} />;
}
