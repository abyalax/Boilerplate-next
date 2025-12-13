import { NextResponse } from 'next/server';
import { ClientCVParams } from '~/common/types/params';

import { NotFoundException } from '~/lib/handler/error';
import { safeHandler } from '~/lib/handler/safe-handler';
import { cvService } from '~/modules/cv/cv.service';

export const permissions = [];

export const GET = safeHandler<ClientCVParams>(async (_, { params }) => {
  const { clientId, cvId } = await params;
  const user = await cvService.findByID(Number(clientId), Number(cvId));
  if (!user) throw new NotFoundException('CV does not found');
  return NextResponse.json({ data: user });
});

export const PUT = safeHandler<ClientCVParams>(async (req, { params }) => {
  const { clientId, cvId } = await params;
  const body = await req.json();
  const updated = await cvService.update(Number(clientId), Number(cvId), body);
  if (!updated) throw new NotFoundException('CV does not found');
  return NextResponse.json({
    message: `CV ${updated.name} updated successfully`,
    data: updated,
  });
});

export const DELETE = safeHandler<ClientCVParams>(async (_, { params }) => {
  const { clientId, cvId } = await params;
  const deleted = await cvService.delete(Number(clientId), Number(cvId));
  if (!deleted) throw new NotFoundException('CV does not found');
  return NextResponse.json({ message: 'CV deleted Successfully' });
});
