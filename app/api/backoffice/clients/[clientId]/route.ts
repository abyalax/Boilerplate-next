import { NextResponse } from 'next/server';
import { safeHandler } from '~/lib/handler/safe-handler';

export const GET = safeHandler<{ clientId: string }>(async () => {
  return await NextResponse.json({ message: 'OK, but service not implemented yet' });
});

export const PUT = safeHandler<{ clientId: string }>(async () => {
  return await NextResponse.json({ message: 'OK, but service not implemented yet' });
});

export const DELETE = safeHandler<{ clientId: string }>(async () => {
  return await NextResponse.json({ message: 'OK, but service not implemented yet' });
});
