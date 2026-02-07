import { XIcon } from 'lucide-react';
import { usePromptInputAttachments } from './prompt-input';

export const AttachmentPreviews = () => {
  const { files, remove } = usePromptInputAttachments();

  if (files.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 pb-2">
      {files.map((file) => (
        <div key={file.id} className="relative group size-16 rounded-lg border overflow-hidden">
          {file.mediaType?.startsWith('image/') ? (
            // biome-ignore lint/performance/noImgElement: <>
            <img src={file.url} alt={file.filename} className="object-cover size-full" />
          ) : (
            <div className="flex items-center justify-center size-full bg-muted text-[10px] p-1 break-all">{file.filename}</div>
          )}

          {/* Tombol Hapus */}
          <button
            onClick={() => remove(file.id)}
            className="absolute top-1 right-1 bg-destructive text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <XIcon className="size-3" />
          </button>
        </div>
      ))}
    </div>
  );
};
