import { TAxiosResponse } from '~/common/types/response';
import { api } from '~/lib/axios/api';
import { ReturnExtracted } from '~/lib/pdf/client';
import { endpoint } from '~/lib/utils/converter';
import { CV } from '~/modules/cv/cv.type';
import { PayloadCV, TFilterCV } from './cv.type';

export const getListCV = (params: TFilterCV, clientId: string) => {
  return api.get(endpoint('/api/[clientId]/cv', { clientId }), { params });
};

export const getCV = (clientId: string, cvId: string): Promise<TAxiosResponse<CV>> => {
  const _endpoint = endpoint('/api/[clientId]/cv/[cvId]', { clientId, cvId });
  return api.get(_endpoint);
};

export const createCV = (clientId: string, payload: CV) => {};

export const updateCV = (clientId: string, cvId: string, payload: PayloadCV) => {
  const _endpoint = endpoint('/api/[clientId]/cv/[cvId]', { clientId, cvId });
  return api.put(_endpoint, payload);
};

export const deleteCV = (clientId: string, cvId: string) => {
  const _endpoint = endpoint('/api/[clientId]/cv/[cvId]', { clientId, cvId });
  return api.delete(_endpoint);
};

export const parseToJsonCV = async (params: {
  clientId: number;
  extracted: ReturnExtracted[];
}): Promise<TAxiosResponse<CV[]>> => {
  const ENDPOINT = endpoint('/api/[clientId]/extract', { clientId: params.clientId.toString() });
  return api.post(ENDPOINT, params.extracted);
};
