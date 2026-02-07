import { useRouter } from 'next/navigation';
import { QUERY_KEY } from '~/common/const/querykey';
import { useMutation } from '~/components/hooks/use-mutation';
import { updateCV } from '~/data/cv/cv.api';
import { PayloadCV } from '~/data/cv/cv.type';

export const useUpdateCV = (clientId: string, cvId: string) => {
  const { back } = useRouter();
  return useMutation({
    mutationFn: async (payload: PayloadCV) => updateCV(clientId, cvId, payload),
    onSuccess: () => back(),
    mutationKey: [QUERY_KEY.CV.UPDATE],
    meta: { invalidateQueries: [QUERY_KEY.CV.GETS] },
  });
};
