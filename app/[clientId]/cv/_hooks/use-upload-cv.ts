import { useMutation } from '@tanstack/react-query';
import { uploadFiles } from '~/lib/axios/upload';
import { endpoint } from '~/lib/utils/converter';

export const useUploadCV = (clientId: string) => {
  return useMutation({
    mutationFn: async (params: (File | undefined)[]) => {
      const _endpoint = endpoint('/api/[clientId]/cv/upload', { clientId });
      await uploadFiles({ endpoint: _endpoint, files: params });
    },
  });
};
