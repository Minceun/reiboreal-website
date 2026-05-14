# Vercel 部署指南

本指南将帮助您将 Reiboreal 网站部署到 Vercel，获取免费的 `.vercel.app` 域名进行测试，并支持将来轻松切换到自定义域名。

## 📋 前置准备

1. **GitHub 账号** - 用于代码托管
2. **Vercel 账号** - [vercel.com](https://vercel.com) 注册（可用 GitHub 账号登录）
3. **环境变量** - 准备好 Sanity 和 Stripe 的配置信息

## 🚀 第一步：准备代码仓库

### 1. 初始化 Git 仓库（如果还没有）

```bash
git init
git add .
git commit -m "Initial commit: Reiboreal website"
```

### 2. 推送到 GitHub

```bash
# 在 GitHub 创建新仓库后
git remote add origin https://github.com/your-username/reiboreal-website.git
git branch -M main
git push -u origin main
```

## 🌐 第二步：部署到 Vercel

### 方式一：通过 Vercel Dashboard（推荐）

1. **登录 Vercel**
   - 访问 [vercel.com](https://vercel.com)
   - 使用 GitHub 账号登录

2. **导入项目**
   - 点击 "Add New..." → "Project"
   - 选择 "Import Git Repository"
   - 授权 Vercel 访问您的 GitHub
   - 选择 `reiboreal-website` 仓库

3. **配置项目**
   - **Project Name**: `reiboreal`（可自定义，这将是您的免费域名前缀）
   - **Framework Preset**: Next.js（自动检测）
   - **Root Directory**: ./（保持默认）
   - **Build Command**: `npm run build`（自动填充）
   - **Output Directory**: `.next`（自动填充）

4. **配置环境变量**
   点击 "Environment Variables"，添加以下变量：

   ```
   # Sanity CMS
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
   SANITY_API_TOKEN=your_api_token

   # Stripe
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
   STRIPE_SECRET_KEY=sk_test_xxx
   STRIPE_WEBHOOK_SECRET=whsec_xxx

   # 网站 URL（使用 Vercel 自动提供的 URL）
   NEXT_PUBLIC_SITE_URL=https://reiboreal.vercel.app
   ```

   💡 **提示**：
   - 先暂时留空 `NEXT_PUBLIC_SITE_URL`
   - 部署后会自动获得域名，再来更新

5. **部署**
   - 点击 "Deploy"
   - 等待 2-3 分钟完成构建

6. **获取免费域名**
   部署成功后，您会获得类似以下的域名：
   ```
   https://reiboreal.vercel.app
   https://reiboreal-git-main-yourname.vercel.app
   https://reiboreal-xxxxx.vercel.app
   ```

7. **更新环境变量**
   - 在 Vercel Dashboard → Settings → Environment Variables
   - 更新 `NEXT_PUBLIC_SITE_URL` 为您的 Vercel 域名
   - 例如：`https://reiboreal.vercel.app`
   - 点击 "Save" 并重新部署

### 方式二：通过 Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel

# 部署到生产环境
vercel --prod
```

## 🔧 第三步：配置 Stripe Webhook

1. **获取 Webhook URL**
   ```
   https://reiboreal.vercel.app/api/webhooks/stripe
   ```

2. **在 Stripe Dashboard 配置**
   - 登录 [Stripe Dashboard](https://dashboard.stripe.com)
   - 进入 "Developers" → "Webhooks"
   - 点击 "Add endpoint"
   - 输入 Webhook URL
   - 选择事件：`checkout.session.completed`, `payment_intent.succeeded`
   - 保存并复制 "Signing secret"

3. **更新环境变量**
   - 在 Vercel 更新 `STRIPE_WEBHOOK_SECRET`
   - 重新部署

## ✅ 第四步：验证部署

访问您的 Vercel 域名，检查：
- ✅ 首页正常显示
- ✅ 多语言切换功能正常
- ✅ 产品页面可访问
- ✅ 购物车功能正常
- ✅ 图片正常加载

## 🎯 将来切换到自定义域名

当您购买了自定义域名（如 `reiboreal.com`）后：

### 1. 在 Vercel 添加域名

1. **进入项目设置**
   - Vercel Dashboard → 您的项目 → Settings → Domains

2. **添加自定义域名**
   - 输入 `reiboreal.com`
   - 点击 "Add"

3. **配置 DNS**
   Vercel 会显示需要添加的 DNS 记录：

   **方式 A：使用 A 记录**
   ```
   A    @    76.76.21.21
   ```

   **方式 B：使用 CNAME（推荐）**
   ```
   CNAME    www    cname.vercel-dns.com
   ```

4. **在域名注册商配置 DNS**
   - 登录您的域名注册商（如阿里云、腾讯云、Namecheap）
   - 添加 Vercel 提供的 DNS 记录
   - 等待 DNS 生效（通常 5-30 分钟）

### 2. 更新环境变量

```bash
# 在 Vercel Dashboard 更新
NEXT_PUBLIC_SITE_URL=https://reiboreal.com
```

### 3. 更新 Stripe Webhook

在 Stripe Dashboard 更新 Webhook URL：
```
https://reiboreal.com/api/webhooks/stripe
```

### 4. 完成！

现在您的网站可以通过自定义域名访问了，并且：
- ✅ 免费 SSL 证书（自动配置）
- ✅ 自动 HTTPS 重定向
- ✅ 全球 CDN 加速
- ✅ 自动保留 `.vercel.app` 域名作为备份

## 🔄 自动部署

每次推送代码到 GitHub，Vercel 会自动：
1. 检测到新提交
2. 运行构建
3. 部署到生产环境
4. 通知部署结果

```bash
# 只需正常推送代码
git add .
git commit -m "Update feature"
git push
```

## 📊 监控和分析

Vercel 提供免费的：
- **Analytics** - 访问统计
- **Speed Insights** - 性能分析
- **Logs** - 运行日志
- **Deployment History** - 部署历史

在 Vercel Dashboard → 您的项目 → Analytics 查看

## ⚙️ 高级配置

### 配置多个环境

1. **预览环境**（自动创建）
   - 每个 Pull Request 自动部署预览
   - 独立的预览 URL

2. **生产环境**
   - `main` 分支自动部署到生产

### 自定义构建设置

编辑 `vercel.json`：
```json
{
  "buildCommand": "npm run build",
  "framework": "nextjs",
  "regions": ["hkg1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

## 🆘 常见问题

### Q: 构建失败怎么办？
**A:** 查看 Vercel 的构建日志，通常是：
- 环境变量未配置
- 依赖安装失败
- TypeScript 类型错误

### Q: 图片加载不出来？
**A:** 检查：
- Sanity 图片域名已添加到 `next.config.js`
- 图片 URL 正确

### Q: Stripe 支付不工作？
**A:** 确认：
- Webhook 已正确配置
- 环境变量正确
- 使用正确的 API 密钥（测试/生产）

### Q: 多语言切换不工作？
**A:** 检查：
- `middleware.ts` 配置正确
- 语言文件存在于 `messages/` 目录

## 📚 相关资源

- [Vercel 文档](https://vercel.com/docs)
- [Next.js 部署文档](https://nextjs.org/docs/deployment)
- [Stripe Webhook 指南](https://stripe.com/docs/webhooks)
- [Sanity 生产环境配置](https://www.sanity.io/docs/deployment)

## 🎉 完成

现在您的 Reiboreal 网站已经成功部署到 Vercel！

**当前状态：**
- ✅ 免费域名：`https://reiboreal.vercel.app`
- ✅ 自动部署：推送代码即部署
- ✅ 全球加速：CDN 分发
- ✅ SSL 证书：自动配置

**下一步：**
- 🎨 完善网站内容
- 🛍️ 添加产品到 Sanity
- 📱 测试各项功能
- 💳 配置 Stripe 支付
- 🌐 购买自定义域名（可选）

有问题？查看 [完整文档](./README.md) 或联系技术支持。
