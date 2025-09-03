/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async createUser(name: string, email: string) {
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
