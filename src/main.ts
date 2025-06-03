import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración Swagger
  const config = new DocumentBuilder()
    .setTitle('Sistema de Pagos API')
    .setDescription('Documentación de la API del sistema de pagos')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT || 3000);

  Logger.log(
    `Aplicación corriendo en http://localhost:${process.env.PORT || 3000}`,
    'Bootstrap',
  );
  Logger.log(
    `Documentación Swagger disponible en http://localhost:${process.env.PORT || 3000}/docs`,
    'Bootstrap',
  );
}
bootstrap();
