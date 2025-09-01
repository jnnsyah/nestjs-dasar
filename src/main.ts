import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import mustache from 'mustache-express/';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // Cookie-Parser Setup
  app.use(cookieParser('SECRET'));

  // View Engine Mustache Setup
  app.set('views', __dirname + '/../views');
  app.set('view engine', 'html');
  app.engine('html', mustache());

  await app.listen(process.env.PORT ?? 3000);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
