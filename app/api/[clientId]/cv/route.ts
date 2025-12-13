import { NextResponse } from 'next/server';

import { TResponse } from '~/common/types/response';
import { TFilterCV } from '~/data/cv/cv.type';
import { safeHandler } from '~/lib/handler/safe-handler';
import { cvService } from '~/modules/cv/cv.service';
import { CV } from '~/modules/cv/cv.type';
import { ClientId } from '~/modules/users/users.type';

export const permissions = [];

export const GET = safeHandler<ClientId>(async (req, { params }) => {
  const { clientId } = await params;

  const searchParams = req.nextUrl.searchParams;
  const _params: Record<string, unknown> = {};

  for (const [key, value] of searchParams.entries()) {
    _params[key] = value ?? '';
  }

  const castParams: TFilterCV = {
    page: Number(_params.page),
    per_page: Number(_params.per_page),
    ..._params,
  };

  const data = await cvService.list(Number(clientId), { ...castParams }, { user_id: Number(clientId) });
  return NextResponse.json({
    message: 'Success get all CVs',
    data,
  });
});

export const POST = safeHandler(async (req): Promise<NextResponse<TResponse<CV>>> => {
  const body = await req.json();
  return NextResponse.json({ data: body });
});
