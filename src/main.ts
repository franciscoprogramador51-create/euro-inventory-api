import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Euro-Inventory API')
    .setDescription('Inventory Management System')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Truque de Sênior: Carrega CDN apenas se estiver na Vercel (Produção)
  const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL;
  
  const swaggerOptions = isProduction ? {
    customCssUrl: "https://cdnjs.cloudflare.com",
    customJs: [
      "https://cdnjs.cloudflare.com",
      "https://cdnjs.cloudflare.com",
    ],
  } : {};

  SwaggerModule.setup('api/docs', app, document, swaggerOptions);

  app.enableCors();
  
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`✅ API ONLINE: http://localhost:${port}/api/docs`);
}
bootstrap();