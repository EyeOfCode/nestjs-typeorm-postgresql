import { HttpService, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap(): Promise<HttpService> {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const listenPort = configService.get<number>('app.PORT');
  return app.listen(listenPort, () => {
    Logger.log('Listening at port:' + listenPort);
  });
}
bootstrap();
