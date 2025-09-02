import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  sayHallo(name: string): string {
    return `Halo, ${name}!`;
  }
}
