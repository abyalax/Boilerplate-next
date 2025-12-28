import { prisma } from '~/db/prisma';
import { Prisma } from '~/generated/prisma/client';
import { Repository } from '../base/repositories';
import { CVMapper } from './cv.map';

export class CVRepository extends Repository<Prisma.CVDelegate, Prisma.CVWhereInput, Prisma.CVOrderByWithRelationInput> {
  constructor() {
    super(prisma.cV);
  }

  async findByID(clientId: number, id: number) {
    const cv = await this.model.findUniqueOrThrow({
      where: { id, user_id: clientId },
    });
    return CVMapper.toDTO(cv);
  }
}
