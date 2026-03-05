import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/common/const/querykey';
import { getCV } from '~/data/cv/cv.api';

export const queryGetCV = (clientId: string, cvId: string) =>
  queryOptions({
    queryKey: [QUERY_KEY.CV.GET_BY_ID, clientId, cvId],
    queryFn: () => getCV(clientId, cvId),
    select: (data) => data.data.data,
  });

export const useGetCV = (clientId: string, cvId: string) => {
  return useSuspenseQuery(queryGetCV(clientId, cvId));
};
