# Reiboreal 官方网站

现代化的饰品品牌电商网站，使用 Next.js 15、Sanity CMS 和 Stripe 构建。

## 技术栈

- **前端框架**: Next.js 15 (App Router)
- **样式**: Tailwind CSS
- **内容管理**: Sanity CMS
- **支付**: Stripe
- **状态管理**: Zustand
- **动画**: Framer Motion
- **部署**: Vercel

## 功能特性

✅ 产品展示画廊
✅ 完整电商功能（购物车、结账）
✅ 品牌故事博客
✅ 响应式设计
✅ SEO 优化
✅ 图片优化
✅ 性能优化

## 开始使用

### 1. 安装依赖

\`\`\`bash
npm install
\`\`\`

### 2. 配置环境变量

复制 \`.env.example\` 到 \`.env.local\`:

\`\`\`bash
cp .env.example .env.local
\`\`\`

然后填写以下环境变量：

\`\`\`env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=你的项目ID
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=你的API令牌

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# 网站配置
NEXT_PUBLIC_SITE_URL=http://localhost:3000
\`\`\`

### 3. 启动开发服务器

\`\`\`bash
npm run dev
\`\`\`

访问 [http://localhost:3000](http://localhost:3000)

## 项目结构

\`\`\`
reiboreal-website/
├── app/                    # Next.js 应用目录
│   ├── page.tsx           # 首页
│   ├── shop/              # 产品页面
│   ├── blog/              # 博客页面
│   ├── cart/              # 购物车
│   └── about/             # 关于页面
├── components/            # React 组件
│   ├── Header.tsx         # 导航栏
│   ├── Footer.tsx         # 页脚
│   ├── ProductCard.tsx    # 产品卡片
│   └── ...
├── lib/                   # 工具函数
│   ├── sanity.ts         # Sanity 客户端
│   └── stripe.ts         # Stripe 配置
├── store/                 # 状态管理
│   └── cartStore.ts      # 购物车状态
├── types/                 # TypeScript 类型
└── public/               # 静态资源
\`\`\`

## 配置 Sanity CMS

详细步骤请查看 [SANITY_SETUP.md](./SANITY_SETUP.md)

## 配置 Stripe

详细步骤请查看 [STRIPE_SETUP.md](./STRIPE_SETUP.md)

## 部署

### 快速部署到 Vercel（推荐）

**免费获取 `.vercel.app` 域名进行测试！**

详细步骤请查看 [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)

快速步骤：
1. 推送代码到 GitHub
2. 在 Vercel 导入项目
3. 配置环境变量
4. 一键部署，获得免费域名：`https://reiboreal.vercel.app`
5. 将来可轻松切换到自定义域名

### 其他部署方式

详细步骤请查看 [DEPLOYMENT.md](./DEPLOYMENT.md)

## 开发指南

### 添加新产品

1. 登录 Sanity Studio
2. 创建新的 Product 文档
3. 填写产品信息（名称、价格、图片等）
4. 发布

### 添加博客文章

1. 登录 Sanity Studio
2. 创建新的 Post 文档
3. 使用富文本编辑器编写内容
4. 发布

### 自定义样式

所有颜色和样式配置在 `tailwind.config.js` 中：

\`\`\`js
colors: {
  cream: '#FAF8F5',
  sand: '#E8DED1',
  taupe: '#C9B8A8',
  charcoal: '#2C2C2C',
  gold: '#D4AF37',
}
\`\`\`

## 性能优化

- ✅ 图片自动优化（Next.js Image）
- ✅ 代码分割
- ✅ 服务端渲染（SSR）
- ✅ 静态生成（SSG）
- ✅ CDN 缓存

## SEO

- ✅ 动态 meta 标签
- ✅ Open Graph 标签
- ✅ Sitemap 自动生成
- ✅ Robots.txt

## 支持

如有问题，请联系：
- 邮箱: hello@reiboreal.com
- 文档: [完整文档](./docs/)

## 许可证

Copyright © 2024 Reiboreal. All rights reserved.
