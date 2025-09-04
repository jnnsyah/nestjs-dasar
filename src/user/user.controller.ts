import {
  Controller,
  Get,
  Header,
  HttpCode,
  HttpException,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Render,
  Req,
  Res,
  UseFilters,
} from '@nestjs/common';
import express from 'express';
import { UserService } from './user/user.service';
import { Connection } from './connection/connection';
import { MailService } from './mail/mail.service';
import { UserRepository } from './user-repository/user-repository';
import { ValidationFilter } from 'src/validation/validation.filter';

@Controller('/api/users')
export class UserController {
  constructor(
    private service: UserService,
    private connection: Connection,
    private mail: MailService,
    private userRepository: UserRepository,
    @Inject('EmailService') private email: MailService,
  ) {}
  // @Inject()
  // private service: UserService;

  @Get('/pipe-id/:id')
  getId(@Param('id', ParseIntPipe) id: number) {
    return `Get Id yang sudah di pipe, ${id}`;
  }

  @Get('/create-user')
  createUser(@Query('name') name: string, @Query('email') email: string) {
    if (!email) {
      throw new HttpException(
        {
          code: 400,
          errors: 'Emailnya di isi ya kaka',
        },
        400,
      );
    }
    return this.userRepository.createUser(name, email);
  }

  @Get('/get-users')
  getUser() {
    return this.userRepository.getUsers();
  }

  @Get('/connection')
  getConnection() {
    this.mail.send();
    // Alias Provider
    this.email.send();
    return this.connection.getName();
  }

  @Get('/depedencies-injection')
  @UseFilters(ValidationFilter)
  sayHallo(@Query('name') name: string) {
    return this.service.sayHallo(name);
  }

  @Get('/set-cookie')
  setCookie(@Query('name') name: string, @Res() res: express.Response) {
    res.cookie('name', name);
    res.status(200).send('Set Cookie Success');
  }

  @Get('/get-cookie')
  getCookie(@Req() req: express.Request): string {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return req.cookies['name'];
  }

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

  @Get('/hello-flag')
  @Render('index.html')
  helloView(@Query('name') name: string) {
    if (name === 'flag') {
      name = 'Flag-01{Hahahy}';
    }
    return {
      title: 'View Engine',
      name: name,
    };
  }
}
