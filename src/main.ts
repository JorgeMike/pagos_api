import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina propiedades no declaradas en DTOs
      forbidNonWhitelisted: true, // Lanza error si se envían propiedades no permitidas
      transform: true, // Transforma automáticamente payloads a los tipos esperados
    }),
  );

  // Configuración Swagger
  const config = new DocumentBuilder()
    .setTitle('Sistema de Pagos API')
    .setDescription('Documentación de la API del sistema de pagos')
    .addTag('Autenticación')
    .addTag('Usuarios')
    .setVersion('1.0')
    .addBearerAuth({ bearerFormat: 'JWT', type: 'http' }, 'jwt')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT || 3000);

  Logger.debug(
    `Aplicación corriendo en http://localhost:${process.env.PORT || 3000}`,
    'Bootstrap',
  );
  Logger.debug(
    `Documentación Swagger disponible en http://localhost:${process.env.PORT || 3000}/docs`,
    'Bootstrap',
  );
}
bootstrap();
