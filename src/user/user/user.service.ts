/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { ValidationService } from 'src/validation/validation/validation.service';
import { z } from 'zod';

@Injectable()
export class UserService {
  constructor(private validaton: ValidationService) {}
  sayHallo(name: string): string {
    const schema = z.string().min(2).max(100);
    const validated = this.validaton.validate(schema, name);

    return `Halo, ${validated}!`;
  }
}
