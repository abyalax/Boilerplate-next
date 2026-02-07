import { QUERY_KEY } from '~/common/const/querykey';
import { useMutation } from '~/components/hooks/use-mutation';
import { deleteCV } from '~/data/cv/cv.api';

export const useDeleteCV = (clientId: string) => {
  return useMutation({
    mutationKey: [QUERY_KEY.CV.DELETE],
    mutationFn: async (cvId: string) => deleteCV(clientId, cvId),
    meta: { invalidateQueries: [QUERY_KEY.CV.GETS] },
  });
};
