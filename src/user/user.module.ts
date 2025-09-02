import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user/user.service';
import {
  Connection,
  mongoDBConnection,
  mySQLConnection,
} from './connection/connection';
import { mailService, MailService } from './mail/mail.service';
import {
  createUserRepository,
  UserRepository,
} from './user-repository/user-repository';

@Module({
  controllers: [UserController],
  providers: [
    // Class Provider
    UserService,
    {
      provide: Connection,
      useClass:
        process.env.DATABASE == 'mysql' ? mySQLConnection : mongoDBConnection,
    },
    // Value Provider
    {
      provide: MailService,
      useValue: mailService,
    },
    // Factory Provider
    {
      provide: UserRepository,
      useFactory: createUserRepository,
      inject: [Connection],
    },
    // Alias Provider
    {
      provide: 'EmailService',
      useExisting: MailService,
    },
  ],
})
export class UserModule {}
