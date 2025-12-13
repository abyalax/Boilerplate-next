import fs from 'node:fs';
import { IncomingMessage } from 'node:http';
import path from 'node:path';
import { Readable } from 'node:stream';
import { Fields, Files, formidable } from 'formidable';
import { NextRequest } from 'next/server';
import { InternalServerErrorException, UnprocessableEntity } from '../handler/error';

const uploadDir = path.join(process.cwd(), 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const form = formidable({
  multiples: true,
  uploadDir,
  keepExtensions: true,
  maxFileSize: 100 * 1024 * 1024,
  filename: (_name, _ext, part) => {
    // part.originalFilename itu nama file asli
    return part.originalFilename || `${Date.now()}${_ext}`;
  },
});

type ParsedFormData = {
  fields: Fields;
  files: Files;
};

const waitFileWritten = (file: any) =>
  new Promise<void>((resolve, reject) => {
    const ws = file._writeStream;

    if (!ws) return resolve(); // in case formidable already closed the stream

    if (ws.closed || ws.writableFinished) {
      return resolve();
    }

    ws.on('close', () => resolve());
    ws.on('finish', () => resolve());
    ws.on('error', reject);
  });

export const extractFiles = async (req: NextRequest) => {
  try {
    // Convert NextRequest → Buffer
    const arrayBuffer = await req.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Make readable stream
    const readable = Readable.from(buffer);

    // Mock IncomingMessage
    const mockReq = Object.assign(readable, {
      headers: {
        'content-type': req.headers.get('content-type') || '',
        'content-length': req.headers.get('content-length') || String(buffer.length),
      },
      method: req.method,
      url: req.url,
    }) as IncomingMessage;

    // Parse with formidable
    const { files } = await new Promise<ParsedFormData>((resolve, reject) => {
      form.parse(mockReq, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    // Ensure all file streams are fully written
    const flatFiles = Object.values(files).flat();
    for (const file of flatFiles) {
      await waitFileWritten(file);
    }

    // Now files.filepath is guaranteed to exist
    return files;
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('maxFileSize') || error.message.includes('maxFieldsSize')) {
        throw new UnprocessableEntity(`File upload error: ${error.message}`);
      }

      if (error.message.includes('Invalid content-type')) throw new UnprocessableEntity('Invalid content type for file upload');

      throw new InternalServerErrorException(`Failed to parse form data: ${error.message}`);
    }

    throw new InternalServerErrorException('An unexpected error occurred during file extraction');
  }
};
