import { NestFactory } from '@nestjs/core';
import { AppModule } from './server/app.module';
import next from 'next';
import { NextAdapter } from './server/adapters/next.adapter';
import { AppConfig } from './server/config/app.config';

async function bootstrap() {
  // 环境配置
  console.log(`Running in ${AppConfig.isProd ? 'production' : 'development'} mode`);
  
  // Next.js设置
  const nextApp = next({ 
    dev: !AppConfig.isProd, 
    dir: './src/client',
    conf: {
      // 资源前缀配置
      assetPrefix: AppConfig.assetPrefix,
      env: {
        // 传递API信息给Next.js客户端
        API_HOST: AppConfig.apiHost,
        PROTOCOL: AppConfig.protocol
      }
    }
  });
  await nextApp.prepare();

  // NestJS设置
  const app = await NestFactory.create(AppModule);
  app.use(NextAdapter.configure(nextApp));
  
  // 生产环境CORS配置
  if (AppConfig.isProd) {
    app.enableCors(AppConfig.cors);
  }
  
  // 启动服务器
  const port = AppConfig.port;
  await app.listen(port);
  console.log(`应用程序已启动: http://localhost:${port}`);
}

bootstrap();
