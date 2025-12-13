import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { parseToJsonCV } from '~/data/cv/cv.api';
import { ExtractParams, pdfToTexts } from '~/lib/pdf/client';

export const useExtractCV = (clientId: string) => {
  const query = useMutation({
    mutationFn: async (params: ExtractParams) => {
      const extracted = await pdfToTexts(params.files, params.onProgress);
      return parseToJsonCV({ clientId: Number(clientId), extracted });
    },
    onSuccess: (_, variables) => toast.success(`Successfully extract ${variables.files.length} files`),
    onError: (error, variables, context) => {
      console.log({ error, variables, context });
      toast.error(`Failed to extract ${variables.files.length} files`);
    },
  });

  return {
    ...query,
    extract: query.mutate,
  };
};
