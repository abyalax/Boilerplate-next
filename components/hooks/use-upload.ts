import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { uploadFiles } from '~/lib/axios/upload';

export const useUploadFiles = () => {
  const query = useMutation({
    mutationFn: uploadFiles,
    onSuccess: (_, variables) => toast.success(`Successfully upload ${variables.files.length} files`),
    onError: (error, variables, context) => {
      console.log({ error, variables, context });
      toast.error(`Failed to upload ${variables.files.length} files`);
    },
  });

  return {
    ...query,
    upload: query.mutate,
  };
};
