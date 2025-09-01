import {
  Controller,
  Get,
  Header,
  HttpCode,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import express from 'express';

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

  // @Get('/:id')
  // getById(@Param('id') id: string): string {
  //   return `GET ${id}`;
  // }

  //HTTP Response
  @Get('/sample-response')
  sampleResponse(@Res() response: express.Response) {
    response.status(200).send('Sample Response');
  }

  // HTTP response decorator
  @Get('/response-decorator')
  @Header('content-type', 'application/json')
  @HttpCode(200)
  responseDecorator(): Record<string, string> {
    return {
      data: 'Hello JSON',
    };
  }

  // @Get('/redirect')
  // @Redirect()
  // redirect(): HttpRedirectResponse {
  //   return {
  //     url: '/api/users/response-decorator',
  //     statusCode: 301,
  //   };
  // }

  @Get('/flag')
  @Header('flag', 'Flag-00{Flag CTF ceritanya')
  @HttpCode(404)
  getFlag(): string {
    return 'Flag';
  }
}
