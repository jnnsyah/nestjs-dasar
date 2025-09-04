/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import mustache from 'mustache-express/';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // Logger Setup
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(logger);

  // Cookie-Parser Setup
  app.use(cookieParser('SECRET'));

  // View Engine Mustache Setup
  app.set('views', __dirname + '/../views');
  app.set('view engine', 'html');
  app.engine('html', mustache());

  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT') ?? 3000);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
