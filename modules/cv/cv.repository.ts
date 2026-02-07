import { prisma } from '~/db/prisma';
import { Prisma } from '~/generated/prisma/client';
import { MemoryCache } from '../base/cache';
import { Repository } from '../base/repositories';
import { CVMapper } from './cv.map';

// adjust to use redist if needed
const memoryCache = new MemoryCache();

export class CVRepository extends Repository<Prisma.CVDelegate, Prisma.CVWhereInput, Prisma.CVOrderByWithRelationInput> {
  constructor() {
    super(prisma.cV, memoryCache);
  }

  async findByID(clientId: number, id: number) {
    const cacheKey = `cv:${clientId}:${id}`;

    if (this.cache) {
      const cached = await this.cache.get(cacheKey);
      if (cached) return cached;
    }

    const cv = await this.model.findUniqueOrThrow({
      where: { id, user_id: clientId },
      include: {
        interests: true,
        educations: true,
        experiences: true,
        projects: true,
        certificates: true,
        skills: { include: { skill: true } },
      },
    });

    if (this.cache) {
      await this.cache.set(cacheKey, cv, { ttl: 600 });
    }

    return CVMapper.toDTO(cv);
  }
}
