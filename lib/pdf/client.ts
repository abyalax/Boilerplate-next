'use client';

import type { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist';
import { DocumentInitParameters } from 'pdfjs-dist/types/src/display/api';
import { GlobalWorkerOptions, getDocument } from '../../public/lib/pdf/pdf.min.mjs';

declare global {
  interface Window {
    pdfjsLib?: unknown & {
      standardFontDataUrl?: string;
    };
  }
}

export type ReturnExtracted = {
  file: string;
  text: string;
};

export type ExtractParams = {
  files: (File | undefined)[];
  onProgress: (progress: number) => void;
};

// Required for Node worker
GlobalWorkerOptions.workerSrc = './pdf.worker.min.mjs';

export class PdfExtractorService {
  private readonly MAX_PAGES = 2;

  private async extractPageText(page: PDFPageProxy): Promise<string> {
    const content = await page.getTextContent();
    const tokens = content.items.map((item) => {
      if ('str' in item && typeof item.str === 'string') {
        return item.str;
      }
      return '';
    });

    return tokens.join(' ');
  }

  async extractRawText(pdfPath: string): Promise<string> {
    const params: DocumentInitParameters = {
      url: pdfPath,
      standardFontDataUrl: '/standard_fonts/',
    };

    const loadingTask = getDocument(params);
    const pdf: PDFDocumentProxy = await loadingTask.promise;

    const limit = Math.min(pdf.numPages, this.MAX_PAGES);
    const pages: string[] = [];

    for (let pageNo = 1; pageNo <= limit; pageNo++) {
      const page: PDFPageProxy = await pdf.getPage(pageNo);
      const text = await this.extractPageText(page);
      pages.push(`${text}\n\n`);
    }

    return pages.join('').trim();
  }
}

export const pdfExtractor = new PdfExtractorService();
pdfExtractor.extractRawText = pdfExtractor.extractRawText.bind(pdfExtractor);

/**
 * Extract raw text from a single PDF file
 */
export const pdfToText = async (file: File): Promise<string> => {
  if (typeof window === 'undefined') {
    throw new Error('pdfToText can only run in browser environment');
  }

  // Setup PDF.js worker
  GlobalWorkerOptions.workerSrc = '/lib/pdf/pdf.worker.min.mjs';
  window.pdfjsLib = {
    ...window.pdfjsLib,
    standardFontDataUrl: '/standard_fonts/',
  };

  const buffer = await file.arrayBuffer();

  const loadingTask = getDocument({
    data: buffer,
    standardFontDataUrl: '/standard_fonts/',
  });

  const pdf = await loadingTask.promise;
  const pageLimit = Math.min(2, pdf.numPages);

  let text = '';
  for (let i = 1; i <= pageLimit; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    text += `${textContent.items.map((item: { str: string }) => item.str).join(' ')}\n`;
  }

  return text;
};

/**
 * Extract raw text from multiple PDF files with progress tracking
 */
export const pdfToTexts = async (
  files: (File | undefined)[],
  onProgress?: (current: number, total: number, percentage: number) => void,
): Promise<ReturnExtracted[]> => {
  const results: ReturnExtracted[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (!file) continue;

    const text = await pdfToText(file);

    results.push({
      file: file.name,
      text,
    });

    if (onProgress) {
      const percentage = Math.round(((i + 1) / files.length) * 100);
      onProgress(i + 1, files.length, percentage);
    }
  }

  return results;
};
