import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

import { env } from '~/common/const/credential';
import { UnauthorizedException } from '~/lib/handler/error';
import { safeHandler } from '~/lib/handler/safe-handler';

// TODO:
export const POST = safeHandler(async (req: NextRequest) => {
  const { token, password } = await req.json();
  const verifyToken = jwt.verify(token, env.JWT_SECRET) as { email: string };

  // TODO: Find User by email first

  if (!verifyToken) throw new UnauthorizedException('Token Expired');
  const hashedPassword = await bcrypt.hash(password, 10);

  // TODO: Update Password

  return NextResponse.json({
    message: 'ok, but the service not implemented yet',
  });
});
