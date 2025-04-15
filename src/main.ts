import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js'; // 添加.js扩展名

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // 生产环境使用动态端口（云平台自动分配）
  const port = process.env.PORT || 3000;
  
  console.log(`Starting server in ${process.env.NODE_ENV || 'development'} mode`);
  console.log(`Attempting to listen on port: ${port}`);
  
  await app.listen(port, '0.0.0.0', () => {
    console.log(`Application is running on: http://localhost:${port}`);
  });
}
bootstrap();
