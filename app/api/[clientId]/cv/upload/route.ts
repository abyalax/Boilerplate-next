import fs from 'node:fs';
import path from 'node:path';
import { NextResponse } from 'next/server';
import { ClientParams } from '~/common/types/params';
import { TNextResponse } from '~/common/types/response';
import { parseToJsonCV } from '~/data/cv/cv.api';
import { UnprocessableEntity } from '~/lib/handler/error';
import { safeHandler } from '~/lib/handler/safe-handler';
import { pdfToTextFromFormidable } from '~/lib/pdf/server';
import { extractFiles } from '~/lib/request/formidable';
import { cvService } from '~/modules/cv/cv.service';
import { CV } from '~/modules/cv/cv.type';

export const config = {
  api: {
    bodyParser: false,
  },
};

export type UploadedFiles = {
  clientId: string;
  files: string[];
  extracted?: CV[];
};

export const POST = safeHandler<ClientParams>(async (req, { params }): TNextResponse<UploadedFiles> => {
  const { clientId } = await params;
  const { files } = await extractFiles(req);

  const uploadedFiles: string[] = [];
  const uploadsDir = path.join(process.cwd(), 'uploads');

  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
  if (files === undefined) return NextResponse.json({ success: false, message: 'No files uploaded' }, { status: 400 });

  for (const file of files ?? []) {
    if (!file) continue;

    const newPath = path.join(uploadsDir, file.originalFilename ?? `${new Date().toString}`);
    fs.renameSync(file.filepath, newPath);
    // todo: upload ke cloud or whatever next plan development
    uploadedFiles.push(`/uploads/${file.originalFilename ?? `${new Date().toString}`}`);
  }

  const flatFiles = Object.values(files).flat();

  const plainTexts = await Promise.all(flatFiles.map((file) => pdfToTextFromFormidable(file)));

  console.log('extraxted to plain text: ', plainTexts);

  const extracted = await parseToJsonCV({
    clientId: Number(clientId),
    extracted: [{ file: files[0].originalFilename ?? '', text: plainTexts.join('\n') }],
  });

  console.log('extracted to json cv: ', extracted);

  const cv = extracted.data.data;

  if (cv === undefined) throw new UnprocessableEntity("Document CV does'nt valid");

  await cvService.createMany(Number(clientId), cv);

  console.log('success extract and create cv: ', cv);

  return NextResponse.json({
    success: true,
    message: 'Files uploaded successfully',
  });
});
