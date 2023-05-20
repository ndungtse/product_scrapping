import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Product Scrapping apis')
    .setDescription('The product scrapping API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  app.enableCors({
    origin: '*',
    methods: ['GET'],
  });
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  const PORT = process.env.PORT || 3232;
  const started = await app.listen(PORT);

  if (started) {
    console.log(`Server started on port ${await app.getUrl()}`);
  }
}
bootstrap();
