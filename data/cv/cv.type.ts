import { MetaRequest } from '~/common/types/meta';
import { CV } from '~/modules/cv/cv.type';

export type TFilterCV = MetaRequest<CV>;
export type PayloadCV = Partial<CV>;
