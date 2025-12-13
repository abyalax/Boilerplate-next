import { AlertCircle, CheckCircle2, Loader2, Paperclip, Upload as UploadIcon, X } from 'lucide-react';
import { ComponentProps, Dispatch, FC, ReactNode, SetStateAction, useRef, useState } from 'react';
import { Button } from '~/components/ui/button';

export type TFile = {
  uid: string;
  name: string;
  status: 'idle' | 'uploading' | 'done' | 'error';
  file?: File;
  url?: string;
  percent?: number;
  error?: string;
};

const getStatusIcon = (status: TFile['status']) => {
  switch (status) {
    case 'uploading':
      return <Loader2 className="w-[16px] h-[16px] animate-spin text-blue-500" />;
    case 'done':
      return <CheckCircle2 className="w-[16px] h-[16px] text-green-500" />;
    case 'error':
      return <AlertCircle className="w-[16px] h-[16px] text-red-500" />;
    default:
      return <UploadIcon className="w-[16px] h-[16px] text-gray-500" />;
  }
};

const getStatusColor = (status: TFile['status']) => {
  switch (status) {
    case 'uploading':
      return 'border-blue-500';
    case 'done':
      return 'border-green-500';
    case 'error':
      return 'border-red-500';
    default:
      return 'border-gray-700';
  }
};

type FileListProps = {
  files: TFile[];
  onRemove?: (uid: string) => void;
  disabled?: boolean;
};

const ButtonFileList: FC<FileListProps> = ({ files, onRemove, disabled = false }) => {
  if (files.length === 0) return null;

  return (
    <div className="space-y-1">
      {files.map((file) => (
        <div key={file.uid} className="relative">
          <div
            className={`
              flex items-center gap-2 px-2 py-1 rounded
              bg-background border-l-2 transition-colors
              ${getStatusColor(file.status)} 
              ${file.status === 'error' ? 'bg-destructive/30 border-destructive' : ''}
              group hover:bg-secondary
            `}
          >
            <Paperclip className="w-3 h-3 text-muted-foreground flex-shrink-0" />
            <span className="text-xs text-foreground truncate flex-1">{file.name}</span>

            {getStatusIcon(file.status)}

            {onRemove && (
              <button
                onClick={() => onRemove(file.uid)}
                disabled={disabled}
                className="cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity p-0.5 hover:bg-secondary/50 rounded disabled:opacity-50"
                type="button"
              >
                <X className="w-4 h-4 text-destructive" />
              </button>
            )}
          </div>

          {/* Progress Bar */}
          {file.status === 'uploading' && file.percent !== undefined && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-muted rounded-b overflow-hidden">
              <div className="h-full bg-primary transition-all duration-300" style={{ width: `${file.percent}%` }} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const DragFileList: FC<FileListProps> = ({ files, onRemove, disabled = false }) => {
  if (files.length === 0) return null;
  return (
    <div className="space-y-2">
      {files.map((file) => (
        <div
          key={file.uid}
          className="flex items-center gap-3 p-2 border rounded-lg bg-background hover:bg-secondary transition-colors"
        >
          {getStatusIcon(file.status)}

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
            {file.error && <p className="text-xs text-destructive">{file.error}</p>}
            {file.status === 'uploading' && file.percent !== undefined && (
              <div className="mt-1 w-full bg-muted rounded-full h-1">
                <div className="bg-primary h-1 rounded-full transition-all" style={{ width: `${file.percent}%` }} />
              </div>
            )}
          </div>

          {onRemove && (
            <button
              onClick={() => onRemove(file.uid)}
              className="cursor-pointer p-1 hover:bg-secondary/50 rounded transition-colors"
              disabled={disabled}
              type="button"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

type UploadProps = {
  files: TFile[];
  setFiles: Dispatch<SetStateAction<TFile[]>>;

  multiple?: boolean;
  maxSize?: number; // in MB
  accept?: string;
  disabled?: boolean;

  showFileList?: boolean;
  mode?: 'drag' | 'button';
  buttonText?: ReactNode;

  onChange?: (fileList: TFile[]) => void;
  onUpload?: (fileList: TFile[]) => Promise<void>;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const Upload: FC<UploadProps> = ({
  multiple = false,
  maxSize = 10,
  showFileList = true,
  disabled = false,
  mode = 'drag',
  buttonText = 'Upload',
  setFiles,
  ...props
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const updateFiles = (newFiles: TFile[]) => {
    setFiles(newFiles);
    props.onChange?.(newFiles);
  };

  const handleFiles = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newFiles: TFile[] = Array.from(selectedFiles).map((file) => {
      const isValid = file.size <= maxSize * 1024 * 1024;

      return {
        uid: `${Date.now()}-${Math.random()}`,
        name: file.name,
        status: isValid ? ('idle' as const) : ('error' as const),
        file,
        error: isValid ? undefined : `File size exceeds ${maxSize}MB`,
      };
    });

    const updatedFiles = multiple ? [...props.files, ...newFiles] : newFiles;
    updateFiles(updatedFiles);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (!disabled) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleClick = () => {
    if (!disabled) inputRef.current?.click();
  };

  const handleRemove = (uid: string) => {
    const updatedFiles = props.files.filter((f) => f.uid !== uid);
    updateFiles(updatedFiles);
  };

  const handleUpload = async () => {
    if (props.onUpload) {
      await props.onUpload(props.files);
    }
  };

  const spreadProps = {
    ...props,
    onChange: undefined,
    children: undefined,
  };

  return (
    <div className="w-full space-y-4" {...spreadProps}>
      <input
        ref={inputRef}
        type="file"
        multiple={multiple}
        accept={props.accept}
        onChange={(e) => handleFiles(e.target.files)}
        className="hidden"
        disabled={disabled}
      />

      {mode === 'button' ? (
        <Button onClick={handleClick} disabled={disabled} variant="outline">
          <UploadIcon className="w-4 h-4 mr-2" />
          {buttonText}
        </Button>
      ) : (
        <div
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer bg-background
            transition-all duration-200
            ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <div className="flex flex-col items-center gap-2">
            <UploadIcon className="w-12 h-12 text-gray-400" />
            <p className="text-base font-medium text-gray-700">Click or drag file to this area to upload</p>
            <p className="text-sm text-gray-500">Support for a single or bulk upload. Maximum file size: {maxSize}MB</p>
          </div>
        </div>
      )}

      {props.files.length > 0 && showFileList && mode === 'drag' ? (
        <DragFileList files={props.files} onRemove={handleRemove} />
      ) : (
        <ButtonFileList files={props.files} onRemove={handleRemove} />
      )}

      {props.files.length > 0 && props.onUpload && (
        <Button onClick={handleUpload} disabled={disabled || props.files.every((f) => f.status === 'done')}>
          Upload Files
        </Button>
      )}
    </div>
  );
};
