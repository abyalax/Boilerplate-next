import { MetaRequest } from '~/common/types/meta';
import { Prisma } from '~/generated/prisma/client';
import { Service } from '../base/services';
import { CVRepository } from './cv.repository';
import { CV } from './cv.type';

class CVService extends Service<CVRepository> {
  constructor() {
    super(new CVRepository());
  }

  list(clientId: number, params: MetaRequest<CV>, where: Prisma.cvWhereInput) {
    const { page, per_page, search, sort_by, sort_order } = params;

    return this.repository.paginate<CV>(clientId, {
      page,
      per_page,
      where,
      order_by: {
        [sort_by as string]: sort_order,
      },
      search: {
        term: search,
        fields: ['name', 'email', 'about', 'address', 'linkedin'],
      },
    });
  }

  findByID(clientId: number, id: number) {
    return this.repository.findByID(clientId, id);
  }

  create(clientId: number, payload: Prisma.cvCreateInput) {
    return this.repository.create(clientId, payload);
  }

  createMany(clientId: number, payload: Prisma.cvCreateManyInput[]) {
    return this.repository.createMany(clientId, payload);
  }

  update(clientId: number, id: number, payload: Prisma.cvUpdateInput) {
    return this.repository.update<CV>(clientId, id, payload);
  }

  delete(clientId: number, id: number) {
    return this.repository.delete(clientId, id);
  }
}

export const cvService = new CVService();
