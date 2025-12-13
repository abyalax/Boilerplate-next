import { Prisma } from '~/generated/prisma/client';
import { mapJson } from '../base/mapping';
import { CV } from './cv.type';

export const CVMapper = {
  toDTO: (cv: Prisma.cvModel): CV => {
    return {
      ...cv,
      ...mapJson<CV>({
        interest: cv?.interest,
        skill: cv?.skill,
        education: cv?.education,
        experience: cv?.experience,
        projects: cv?.projects,
        certificate: cv?.certificate,
      }),
    };
  },
};
