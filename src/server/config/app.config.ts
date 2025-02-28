/**
 * 应用程序配置
 * 集中管理环境变量和应用配置
 */
export const AppConfig = {
  // 环境配置
  isProd: process.env.NODE_ENV === 'production',
  port: parseInt(process.env.PORT || '3000', 10),
  
  // API配置
  apiHost: process.env.API_HOST || '',
  
  // 资源前缀
  assetPrefix: process.env.ASSET_PREFIX || '',
  
  // 通信协议（默认使用http避免本地开发SSL问题）
  protocol: 'http',
  
  // CORS配置
  cors: {
    origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  },
};
