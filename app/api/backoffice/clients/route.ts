import { NextResponse } from 'next/server';
import { safeHandler } from '~/lib/handler/safe-handler';

export const permissions = [];

export const GET = safeHandler(async () => {
  return NextResponse.json({ message: 'OK, but service not implemented yet' });
});

export const POST = safeHandler(async () => {
  return NextResponse.json({ message: 'OK, but service not implemented yet' });
});
