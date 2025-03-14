import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    app.enableCors({
      origin: 'http://localhost:3000',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    });

  app.setGlobalPrefix('api');

  // app.use(bodyParser.json({limit: '5mb'}))
  // app.use(bodyParser.urlencoded({limit: '5mb'}))

  // const port = Number(process.env.PORT) || 3000;


  await app.listen(4200);
}
bootstrap();
