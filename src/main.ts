import 'dotenv/config'; // <-- ESTA DEVE SER A LINHA 1 DO ARQUIVO
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Euro-Inventory API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Força o host 0.0.0.0 para o Windows não bloquear
  await app.listen(3000, '0.0.0.0');
  console.log(`🚀 API ONLINE: http://localhost:3000/api/docs`);
}
bootstrap();