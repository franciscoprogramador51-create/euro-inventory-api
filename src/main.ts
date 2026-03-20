import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Euro-Inventory API')
    .setDescription('Inventory Management System - GDPR Compliant')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // --- ESTA É A PARTE PARA O VERCEL (Coloque aqui) ---
  const CSS_URL = "https://cdnjs.cloudflare.com";
  const JS_URL = [
    "https://cdnjs.cloudflare.com",
    "https://cdnjs.cloudflare.com",
  ];

  SwaggerModule.setup('api/docs', app, document, {
    customCssUrl: CSS_URL,
    customJs: JS_URL,
  });
  // --------------------------------------------------

  app.enableCors();

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`✅ API ONLINE: http://localhost:${port}/api/docs`);
}

bootstrap();
export default (req: any, res: any) => {}; // Adicione isso para ajudar a Vercel