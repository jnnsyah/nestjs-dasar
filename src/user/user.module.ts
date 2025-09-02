import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user/user.service';
import {
  Connection,
  mongoDBConnection,
  mySQLConnection,
} from './connection/connection';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: Connection,
      useClass:
        process.env.DATABASE == 'mysql' ? mySQLConnection : mongoDBConnection,
    },
  ],
})
export class UserModule {}
