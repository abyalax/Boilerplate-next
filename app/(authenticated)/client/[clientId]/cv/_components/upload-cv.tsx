import { Upload as UploadIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { TFile, Upload } from '~/components/fragments/input/upload';
import { Modal } from '~/components/fragments/modal/modal';
import { Button } from '~/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip';
import { useUploadCV } from '../_hooks/use-upload-cv';

export const UploadCV = () => {
  const [files, setFiles] = useState<TFile[]>([]);
  const { clientId } = useParams<{ clientId: string }>();
  const { mutate } = useUploadCV(clientId);

  const handleUpload = () => {
    mutate(files.map((file) => file.file));
  };

  return (
    <Modal
      textCancel={<Button variant={'outline'}>Cancel</Button>}
      textAction={<Button onClick={handleUpload}>Upload CV</Button>}
      buttonOpen={
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant={'outline'}>
              <UploadIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Upload CV</TooltipContent>
        </Tooltip>
      }
      title="Upload CV"
      content={<Upload multiple files={files} setFiles={setFiles} mode="drag" showFileList />}
    />
  );
};
