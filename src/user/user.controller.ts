import { Controller, Get, Param, Post, Query } from '@nestjs/common';

@Controller('/api/users')
export class UserController {
  @Post()
  post(): string {
    return 'POST';
  }

  @Get('/sample')
  get(): string {
    return 'GET';
  }

  // Decorator HTTP Request di NestJS
  @Get('/hello')
  sayHello(@Query('name') name: string, @Query('age') age: string): string {
    return `Hi ${name || 'stranger'}, you're ${age || 0}`;
  }

  @Get('/:id')
  getById(@Param('id') id: string): string {
    return `GET ${id}`;
  }
}
