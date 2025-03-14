import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config/envs';
import { Logger, ValidationPipe } from '@nestjs/common';
import { CustomExceptionFilter } from './users/exceptions/filter/custom-exception.filter';

async function bootstrap() {
  const logger = new Logger('users-main');
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new CustomExceptionFilter());

  await app.listen(envs.port);
  logger.log(`App is listening on port ${envs.port}`);
}
bootstrap().catch((error: Error) => {
  const logger = new Logger('Bootstrap-Users');
  logger.error(`Error during bootstrap: ${error.message}`, error.stack);
});
