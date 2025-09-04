/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class UserRepository {
  constructor(
    private prisma: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
  ) {
    this.logger.info('User Repository Service');
  }

  async createUser(name: string, email: string) {
    this.logger.info(`Ada user baru nih, namanya ${name} pake email ${email}`);
    return this.prisma.user.create({
      data: {
        name,
        email,
      },
    });
  }

  async getUsers() {
    return this.prisma.user.findMany();
  }
}

// export function createUserRepository(connection: Connection): UserRepository {
//   const userRepository = new UserRepository();
//   userRepository.connection = connection;
//   return userRepository;
// }
