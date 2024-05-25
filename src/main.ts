import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './config/filter.argument';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: { origin: '*' } });
  const configService = app.get(ConfigService);
  const port = configService.get('PORT') ?? 7002;

  // app.useGlobalFilters(new AllExceptionsFilter());

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.setGlobalPrefix('api');   

  // Swagger setup
  const options = new DocumentBuilder()
    .setTitle('Course Client API')
    .setDescription('Course Client Description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs-course-client', app, document);

  const logger = new Logger();
  app.useLogger(logger);

  await app.listen(port);
  console.log(port);
  console.log("Running");
}

bootstrap();
