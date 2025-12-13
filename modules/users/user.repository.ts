import { prisma } from '~/db/prisma';
import { Prisma } from '~/generated/prisma/client';
import { Repository } from '../base/repositories';
import { UserMapper } from './users.map';

export class UserRepository extends Repository<
  Prisma.usersDelegate,
  Prisma.usersWhereInput,
  Prisma.usersOrderByWithRelationInput
> {
  constructor() {
    super(prisma.users);
  }

  _getModel() {
    return this.model;
  }

  findByEmail(email: string) {
    return this.model.findUniqueOrThrow({
      where: { email },
    });
  }

  async findWithRolesAndPermissions(where: Prisma.usersWhereUniqueInput) {
    const user = await prisma.users.findUniqueOrThrow({
      where,
      include: {
        user_roles: {
          include: {
            role: {
              include: {
                role_permissions: {
                  include: {
                    permission: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return UserMapper.toDTO(user);
  }
}
