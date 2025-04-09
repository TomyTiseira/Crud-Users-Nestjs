import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config/envs';
import { Logger, ValidationPipe } from '@nestjs/common';
import { CustomExceptionFilter } from './users/exceptions/filter/custom-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('users-main');
  const app = await NestFactory.create(AppModule);

  // Prueba 2

  // configuración swagger
  const config = new DocumentBuilder()
    .setTitle('API de Usuarios')
    .setDescription('Documentación de la API de usuarios')
    .setVersion('1.0')
    .addTag('usuarios')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // global prefijo
  app.setGlobalPrefix('api');

  // global pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // global exception filter
  app.useGlobalFilters(new CustomExceptionFilter());

  await app.listen(envs.port);
  logger.log(`App is listening on port ${envs.port}`);
}
bootstrap().catch((error: Error) => {
  const logger = new Logger('Bootstrap-Users');
  logger.error(`Error during bootstrap: ${error.message}`, error.stack);
});
