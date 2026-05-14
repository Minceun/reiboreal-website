# 🚀 快速部署指南

部署 Reiboreal 网站到 Vercel，5 分钟获取免费域名！

## ⚡ 快速开始

### 1️⃣ 推送代码到 GitHub

```bash
# 初始化 Git（如果还没有）
git init
git add .
git commit -m "Ready for deployment"

# 推送到 GitHub
git remote add origin https://github.com/你的用户名/reiboreal-website.git
git branch -M main
git push -u origin main
```

### 2️⃣ 登录 Vercel

访问 [vercel.com](https://vercel.com)，用 GitHub 账号登录

### 3️⃣ 导入项目

1. 点击 "Add New..." → "Project"
2. 选择 `reiboreal-website` 仓库
3. 项目名称：`reiboreal`（这将是您的域名前缀）

### 4️⃣ 配置环境变量

在部署前添加这些环境变量：

```env
# Sanity CMS（从 sanity.io 获取）
NEXT_PUBLIC_SANITY_PROJECT_ID=你的项目ID
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=你的API令牌

# Stripe（从 stripe.com 获取）
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# 网站 URL（先留空，部署后再填）
NEXT_PUBLIC_SITE_URL=
```

### 5️⃣ 部署

点击 "Deploy" 按钮，等待 2-3 分钟

### 6️⃣ 获取免费域名

部署成功后，您会得到：
```
https://reiboreal.vercel.app
```

### 7️⃣ 更新环境变量

回到 Vercel → Settings → Environment Variables

更新 `NEXT_PUBLIC_SITE_URL`：
```
NEXT_PUBLIC_SITE_URL=https://reiboreal.vercel.app
```

保存并重新部署（Deployments → 最新部署 → 三个点 → Redeploy）

## ✅ 完成！

您的网站现在可以访问了：
- 🌐 主域名：`https://reiboreal.vercel.app`
- 🔒 自动 HTTPS
- 🌍 全球 CDN 加速
- 🔄 自动部署（推送代码即部署）

## 📝 后续配置

### 配置 Stripe Webhook

1. Webhook URL：`https://reiboreal.vercel.app/api/webhooks/stripe`
2. 在 [Stripe Dashboard](https://dashboard.stripe.com) 添加
3. 复制 Signing Secret 更新环境变量

### 添加内容

1. 登录 [Sanity Studio](https://你的项目.sanity.studio)
2. 添加产品和博客文章
3. 内容会自动同步到网站

## 🎯 将来切换自定义域名

购买域名后（如 `reiboreal.com`）：

1. Vercel → Settings → Domains → 添加域名
2. 在域名注册商配置 DNS（Vercel 会告诉您如何配置）
3. 更新环境变量 `NEXT_PUBLIC_SITE_URL`
4. 完成！

**只需 3 步，零停机时间！**

## 📚 详细文档

- [完整部署指南](./VERCEL_DEPLOYMENT.md)
- [项目文档](./README.md)
- [Sanity 配置](./SANITY_SETUP.md)
- [Stripe 配置](./STRIPE_SETUP.md)

## 🆘 遇到问题？

常见问题：
- **构建失败**：检查环境变量是否正确
- **页面 404**：检查路由配置
- **图片不显示**：检查 Sanity 配置
- **支付不工作**：检查 Stripe Webhook

查看详细的[故障排除指南](./VERCEL_DEPLOYMENT.md#常见问题)

---

**现在就开始部署吧！只需 5 分钟。** 🚀
