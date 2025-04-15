import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js'; // 添加.js扩展名
import compression from 'compression'; // 添加压缩中间件导入

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // 使用 Vercel 提供的环境变量
  const port = process.env.PORT || 3000;
  const host = '0.0.0.0';

  // 添加跨平台支持
  app.enableShutdownHooks();
  // 生产环境建议开启压缩
  app.use(compression());
  // 添加健康检查接口
  app.use('/health', (req, res) => res.status(200).send('OK'));
  
  await app.listen(port, host, () => {
    console.log(`Application is running on: http://${host}:${port}`);
  });
}
bootstrap();
