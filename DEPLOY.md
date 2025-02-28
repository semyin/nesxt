# 2N-Blog 部署指南

简易部署指南，帮助你将应用部署到开发或生产环境。

## 开发环境

1. 安装依赖：
   ```bash
   npm install
   ```

2. 启动开发服务器：
   ```bash
   # 普通启动
   npm run dev
   
   # 使用SWC加速启动（推荐）
   npm run dev:fast
   ```

## 生产环境部署

1. 安装依赖：
   ```bash
   npm install
   ```

2. 构建项目：
   ```bash
   npm run build
   ```

3. 启动生产服务器：
   ```bash
   npm run start:prod
   ```

4. （可选）使用进程管理器：
   ```bash
   # 使用PM2
   npm install -g pm2
   pm2 start dist/main.js --name "2n-blog"
   ```

## 环境变量

创建一个`.env`文件在项目根目录：

```
# 基本配置
NODE_ENV=production
PORT=3000
```

## Docker部署（可选）

```bash
# 构建镜像
docker build -t 2n-blog .

# 运行容器
docker run -p 3000:3000 -d 2n-blog
```
