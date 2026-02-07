'use client';

import { FileText } from 'lucide-react';

interface FilePreviewProps {
  previewFile: File | undefined;
}

export function FilePreview({ previewFile }: FilePreviewProps) {
  if (!previewFile) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
        <FileText className="w-12 h-12 mb-2 opacity-30" />
        <p className="text-sm">Belum ada file untuk preview</p>
      </div>
    );
  }

  return <iframe src={URL.createObjectURL(previewFile)} className="w-full h-full" title="CV Preview" />;
}
