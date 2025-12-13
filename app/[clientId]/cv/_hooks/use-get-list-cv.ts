import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/common/const/querykey';
import { MetaRequest } from '~/common/types/meta';
import { getListCV } from '~/data/cv/cv.api';
import { TFilterCV } from '~/data/cv/cv.type';
import { CV } from '~/modules/cv/cv.type';

export const queryGetCVs = (clientId: string, params: TFilterCV) =>
  queryOptions({
    queryKey: [QUERY_KEY.CV.GETS, params],
    queryFn: () => getListCV(params, clientId),
    select: (data) => data.data.data,
  });

export const useGetCVs = (clientId: string, params: MetaRequest<CV>) => {
  return useSuspenseQuery(queryGetCVs(clientId, params));
};
