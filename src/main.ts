import 'dotenv/config'; // <-- ESTA DEVE SER A LINHA 1 DO ARQUIVO
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

 // No seu main.ts, dentro da função bootstrap:

const config = new DocumentBuilder()
  .setTitle('Euro-Inventory API')
  .setDescription('Inventory Management System - GDPR Compliant')
  .setVersion('1.0')
  .build();

const document = SwaggerModule.createDocument(app, config);

// O SEGREDO PARA VERCEL: Usamos links externos para o CSS e JS do Swagger
const CSS_URL = "https://cdnjs.cloudflare.com";
const JS_URL = [
  "https://cdnjs.cloudflare.com",
  "https://cdnjs.cloudflare.com",
];

SwaggerModule.setup('api/docs', app, document, {
  customCssUrl: CSS_URL,
  customJs: JS_URL,
});