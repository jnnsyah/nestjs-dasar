import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user/user.service';
import { Connection, createConnection } from './connection/connection';
import { mailService, MailService } from './mail/mail.service';
import { UserRepository } from './user-repository/user-repository';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [UserController],
  providers: [
    // Class Provider
    UserRepository,
    UserService,
    {
      provide: Connection,
      useFactory: createConnection,
      inject: [ConfigService],
    },
    // Value Provider
    {
      provide: MailService,
      useValue: mailService,
    },
    // Factory Provider
    // {
    //   provide: UserRepository,
    //   useFactory: createUserRepository,
    //   inject: [Connection],
    // },
    // Alias Provider
    {
      provide: 'EmailService',
      useExisting: MailService,
    },
  ],
})
export class UserModule {}
