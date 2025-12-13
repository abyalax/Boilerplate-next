import { createReadStream, statSync } from 'node:fs';
import * as nodePath from 'node:path';
import { NextResponse } from 'next/server';
import { safeHandler } from '~/lib/handler/safe-handler';
import { detectMime } from '~/lib/utils/file';

export const GET = safeHandler<{ path: string[] }>(async (_req, { params }) => {
  const { path } = await params;

  console.log(await params);

  const filePath = nodePath.join(process.cwd(), 'uploads', ...path);

  try {
    const stat = statSync(filePath);
    const stream = createReadStream(filePath);

    // @ts-expect-error
    return new NextResponse(stream, {
      status: 200,
      headers: {
        'Content-Length': stat.size.toString(),
        'Content-Type': detectMime(filePath),
      },
    });
  } catch (_) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }
});
