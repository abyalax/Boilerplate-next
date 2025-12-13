import fs from 'node:fs/promises';
import type { File as FormidableFile } from 'formidable';
import { SmartPDFParser } from 'pdf-parse-new';

export const pdfToTextFromFormidable = async (file: FormidableFile | FormidableFile[]): Promise<string> => {
  console.log('parsing file pdf from: ', file);

  const files = Array.isArray(file) ? file : [file];

  let fullText = '';

  for (const f of files) {
    if (typeof f === 'string') continue; // safety

    const buffer = await fs.readFile(f.filepath);

    try {
      const pdf = new SmartPDFParser();
      const data = await pdf.parse(buffer);
      fullText += data.text;
    } catch (err) {
      console.error(`Error parsing PDF ${f.originalFilename}:`, err);
      // bisa throw atau skip
      throw new Error(`Failed to extract text from PDF: ${f.originalFilename}`);
    }
  }

  return fullText.trim();
};
