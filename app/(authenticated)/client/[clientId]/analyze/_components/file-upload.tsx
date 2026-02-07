'use client';

import { FileText, Upload, X } from 'lucide-react';
import { Dispatch, FC, SetStateAction, useCallback, useState } from 'react';
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';

interface Props {
  files: File[] | undefined;
  previewFile: File | undefined;

  setFiles: Dispatch<SetStateAction<File[] | undefined>>;
  setPreviewFile: Dispatch<SetStateAction<File | undefined>>;
}

export const FileUpload: FC<Props> = ({ setFiles, files, previewFile, setPreviewFile }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const isFilePDF = useCallback((f: File) => f.type === 'application/pdf', []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const droppedFiles = Array.from(e.dataTransfer.files).filter(isFilePDF);

      if (droppedFiles.length > 0) {
        setFiles(droppedFiles);
        setPreviewFile(droppedFiles[0]);
      }
    },
    [setFiles, setPreviewFile, isFilePDF],
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = e.target.files ? Array.from(e.target.files).filter(isFilePDF) : [];

      if (selectedFiles.length > 0) {
        setFiles(selectedFiles);
        setPreviewFile(selectedFiles[0]);
      }
    },
    [setFiles, setPreviewFile, isFilePDF],
  );

  const handleRemove = useCallback(
    (f: File) => {
      const updatedFiles = files?.filter((file) => file.name !== f.name);
      setFiles(updatedFiles);

      // Jika file yang dihapus sedang di-preview
      if (previewFile && previewFile.name === f.name) {
        // Fallback ke file pertama yang tersisa, atau undefined jika kosong
        if (updatedFiles && updatedFiles.length > 0) {
          setPreviewFile(updatedFiles[0]);
        } else {
          setPreviewFile(undefined);
        }
      }
    },
    [setFiles, files, setPreviewFile, previewFile],
  );

  const handleSelectPreviewFile = (f: File) => setPreviewFile(f);

  if (files) {
    return files.map((f) => (
      <div
        onClick={() => handleSelectPreviewFile(f)}
        key={f.name}
        className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border h-16 my-4 cursor-pointer"
      >
        <div className="p-2 rounded-lg bg-primary/10 shrink-0">
          <FileText className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate">{f.name}</p>
          <p className="text-xs text-muted-foreground">{(f.size / 1024 / 1024).toFixed(2)} MB</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleRemove(f)}
          className="shrink-0 text-muted-foreground hover:text-destructive"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    ));
  }

  return (
    <label
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        'flex flex-col items-center justify-center w-full rounded-lg border-2 border-dashed cursor-pointer transition-all duration-300',
        isDragging ? 'border-primary bg-primary/5 scale-[1.02]' : 'border-border hover:border-primary/50 hover:bg-muted/50',
      )}
    >
      <div className="flex flex-col items-center justify-center p-4">
        <div className={cn('p-3 rounded-full mb-2 transition-colors', isDragging ? 'bg-primary/10' : 'bg-muted')}>
          <Upload className={cn('w-5 h-5 transition-colors', isDragging ? 'text-primary' : 'text-muted-foreground')} />
        </div>
        <p className="text-sm text-foreground font-medium text-center">
          <span className="text-primary">Klik upload</span> atau drag & drop
        </p>
        <p className="text-xs text-muted-foreground">PDF (MAX. 10MB)</p>
      </div>
      <input type="file" className="hidden" multiple accept=".pdf" onChange={handleFileChange} />
    </label>
  );
};
