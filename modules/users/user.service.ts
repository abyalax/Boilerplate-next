import { Prisma } from '~/generated/prisma/client';
import { Service } from '../base/services';
import { UserRepository } from './user.repository';

class UserService extends Service<UserRepository> {
  constructor() {
    super(new UserRepository());
  }

  paginateUsers(page: number, per_page: number) {
    return this.repository.paginate(0, {
      page,
      per_page,
    });
  }

  findByEmail(email: string) {
    return this.repository.findByEmail(email);
  }

  findUser(where: Prisma.UserWhereUniqueInput) {
    return this.repository.findWithRolesAndPermissions(where);
  }

  create(data: Prisma.UserCreateInput) {
    return this.repository.create(0, data);
  }
}

export const userService = new UserService();
