import { MetaRequest } from '~/common/types/meta';
import { Prisma } from '~/generated/prisma/client';
import { Service } from '../base/services';
import { CVMapper, CVWithRelations } from './cv.map';
import { CVRepository } from './cv.repository';
import { CV } from './cv.type';

class CVService extends Service<CVRepository> {
  constructor() {
    super(new CVRepository());
  }

  async list(clientId: number, params: MetaRequest<CV>, where: Prisma.CVWhereInput) {
    const { page, per_page, search, sort_by, sort_order } = params;
    const cacheKey = JSON.stringify(params);

    if (this.repository.cache) {
      const cached = await this.repository.cache.get(cacheKey);
      if (cached) return cached;
    }

    const data = await this.repository.paginate<CVWithRelations, Prisma.CVInclude>({
      page,
      per_page,
      where: {
        user_id: clientId,
        ...where,
      },
      order_by: {
        [sort_by as string]: sort_order,
      },
      include: {
        interests: true,
        educations: true,
        experiences: true,
        projects: true,
        certificates: true,
        skills: { include: { skill: true } },
      },
      search: {
        term: search,
        fields: ['name', 'email', 'about', 'address', 'linkedin', 'educations', 'experiences', 'interests', 'skills'],
        mapper: {
          name: (term) => ({
            name: { contains: term, mode: 'insensitive' },
          }),

          email: (term) => ({
            email: { contains: term, mode: 'insensitive' },
          }),

          about: (term) => ({
            about: { contains: term, mode: 'insensitive' },
          }),

          address: (term) => ({
            address: { contains: term, mode: 'insensitive' },
          }),

          linkedin: (term) => ({
            linkedin: { contains: term, mode: 'insensitive' },
          }),

          educations: (term) => ({
            educations: {
              some: {
                OR: [{ field: { contains: term, mode: 'insensitive' } }, { major: { contains: term, mode: 'insensitive' } }],
              },
            },
          }),

          experiences: (term) => ({
            experiences: {
              some: {
                OR: [
                  { role: { contains: term, mode: 'insensitive' } },
                  { company: { contains: term, mode: 'insensitive' } },
                  { description: { contains: term, mode: 'insensitive' } },
                ],
              },
            },
          }),

          interests: (term) => ({
            interests: {
              some: {
                name: { contains: term, mode: 'insensitive' },
              },
            },
          }),

          skills: (term) => ({
            name: { contains: term, mode: 'insensitive' },
          }),
        },
      },
    });

    const mapped = data.items.map((e) => CVMapper.toDTO(e));
    const result = {
      items: mapped,
      meta: data.meta,
    };

    if (this.repository.cache) {
      await this.repository.cache.set(cacheKey, result, { ttl: 600 });
    }
    return result;
  }

  findByID(clientId: number, id: number) {
    return this.repository.findByID(clientId, id);
  }

  create(clientId: number, payload: Prisma.CVCreateInput) {
    return this.repository.create(clientId, payload);
  }

  createMany(clientId: number, payload: Prisma.CVCreateManyInput[]) {
    return this.repository.createMany(clientId, payload);
  }

  update(clientId: number, id: number, payload: Prisma.CVUpdateInput) {
    return this.repository.update<CV>(clientId, id, payload);
  }

  delete(clientId: number, id: number) {
    return this.repository.delete(clientId, id);
  }
}

export const cvService = new CVService();
