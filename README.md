# 2N-Blog

一个基于NestJS和Next.js构建的现代化博客应用。

## 技术栈

- **后端**: [NestJS](https://nestjs.com/)
- **前端**: [Next.js](https://nextjs.org/)
- **风格**: [TailwindCSS](https://tailwindcss.com/)

## 特性

- 完整的博客功能：创建、阅读、更新和删除文章
- 无服务器渲染 (SSR) 用于更好的SEO和首次加载性能
- 快速响应的移动友好界面
- REST API接口

## 快速开始

### 开发环境

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 使用SWC加速启动（推荐）
npm run dev:fast
```

### 生产环境

```bash
# 构建应用
npm run build

# 启动生产服务器
npm run start:prod
```

## 项目结构

```
/src
  /client        # Next.js前端代码
    /components  # React组件
    /pages       # Next.js页面
    /styles      # CSS样式
    /public      # 静态资源
  /server        # NestJS后端代码
    /adapters    # 适配器
    /controllers # 控制器
    /services    # 服务
    /models      # 数据模型
  main.ts        # 应用入口
```

## 部署

详细部署指南可以在[DEPLOY.md](./DEPLOY.md)文件中找到。

## 许可证

MIT
