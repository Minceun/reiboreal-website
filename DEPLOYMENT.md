# 部署指南 - 完全免费方案

本指南将帮助你将网站部署上线，总成本约 $10/年（仅域名费用）。

## 部署清单

- [ ] 配置 Sanity CMS
- [ ] 配置 Stripe
- [ ] 注册域名
- [ ] 部署到 Vercel
- [ ] 配置自定义域名
- [ ] 设置环境变量
- [ ] 测试网站功能

---

## 第一步：注册域名

### 推荐注册商（选择一个）

#### 选项 A：Namesilo（最便宜）
价格：约 $8-10/年

1. 访问 [namesilo.com](https://www.namesilo.com/)
2. 搜索你想要的域名（例如：reiboreal.com）
3. 添加到购物车并结账
4. ✅ 免费隐私保护（WHOIS Privacy）

#### 选项 B：Namecheap
价格：约 $9-13/年（首年通常有折扣）

1. 访问 [namecheap.com](https://www.namecheap.com/)
2. 搜索并购买域名
3. ✅ 首年免费 WHOIS 保护

#### 选项 C：Cloudflare Registrar（成本价）
价格：约 $8.03/年（成本价，无加价）

1. 需要先将域名转入 Cloudflare
2. 适合已有域名的用户

### 域名选择建议

✅ 推荐：
- reiboreal.com
- reiboreal.co
- reiboreal.jewelry

❌ 避免：
- 使用连字符（reibo-real.com）
- 使用数字（reiboreal2024.com）
- 过长的域名

---

## 第二步：部署到 Vercel（免费）

### 2.1 准备代码

确保你的代码已经推送到 GitHub：

\`\`\`bash
# 初始化 Git（如果还没有）
git init
git add .
git commit -m "Initial commit"

# 创建 GitHub 仓库并推送
# 1. 访问 github.com，创建新仓库
# 2. 运行以下命令：
git remote add origin https://github.com/你的用户名/reiboreal-website.git
git branch -M main
git push -u origin main
\`\`\`

### 2.2 注册 Vercel

1. 访问 [vercel.com](https://vercel.com/)
2. 点击 "Sign Up"
3. 使用 GitHub 账户登录（推荐）
4. ✅ **完全免费，无需信用卡**

### 2.3 导入项目

1. 在 Vercel 控制台，点击 "Add New Project"
2. 选择 "Import Git Repository"
3. 找到你的 `reiboreal-website` 仓库
4. 点击 "Import"

### 2.4 配置项目

在部署配置页面：

**Framework Preset**: Next.js（自动检测）

**Root Directory**: ./

**Build Command**: `npm run build`（自动填写）

**Output Directory**: .next（自动填写）

**Install Command**: `npm install`（自动填写）

### 2.5 添加环境变量

在 "Environment Variables" 部分，添加以下变量：

\`\`\`
NEXT_PUBLIC_SANITY_PROJECT_ID = 你的Sanity项目ID
NEXT_PUBLIC_SANITY_DATASET = production
NEXT_PUBLIC_SANITY_API_VERSION = 2024-01-01
SANITY_API_TOKEN = 你的Sanity Token

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = pk_test_xxx
STRIPE_SECRET_KEY = sk_test_xxx
STRIPE_WEBHOOK_SECRET = whsec_xxx

NEXT_PUBLIC_SITE_URL = https://你的域名.com
\`\`\`

### 2.6 部署

点击 "Deploy"，等待 2-3 分钟。

部署完成后，你会获得一个临时域名：
\`https://reiboreal-website-xxx.vercel.app\`

---

## 第三步：配置自定义域名

### 3.1 在 Vercel 添加域名

1. 在 Vercel 项目控制台，进入 **Settings** → **Domains**
2. 输入你购买的域名（例如：reiboreal.com）
3. 点击 "Add"

### 3.2 配置 DNS

Vercel 会显示需要添加的 DNS 记录。

#### 如果使用 Namesilo 或 Namecheap：

1. 登录你的域名注册商
2. 找到 DNS 管理页面
3. 添加以下记录：

**选项 A：使用 A 记录（推荐）**
\`\`\`
Type: A
Host: @
Value: 76.76.21.21
TTL: 3600
\`\`\`

\`\`\`
Type: A
Host: www
Value: 76.76.21.21
TTL: 3600
\`\`\`

**选项 B：使用 CNAME 记录**
\`\`\`
Type: CNAME
Host: www
Value: cname.vercel-dns.com
TTL: 3600
\`\`\`

### 3.3 验证域名

DNS 配置后，等待 5 分钟到 24 小时（通常几分钟就好）。

在 Vercel 控制台检查域名状态，当显示 ✅ 即表示成功。

Vercel 会自动为你的域名配置免费 HTTPS 证书。

---

## 第四步：配置 Stripe Webhook

现在网站已上线，需要配置 Stripe Webhook：

1. 登录 [dashboard.stripe.com](https://dashboard.stripe.com/)
2. 进入 **Developers** → **Webhooks**
3. 点击 "Add endpoint"
4. 输入 URL：
   \`\`\`
   https://你的域名.com/api/webhooks/stripe
   \`\`\`
5. 选择事件：
   - `checkout.session.completed`
   - `payment_intent.succeeded`
6. 复制 **Signing secret**
7. 在 Vercel 环境变量中更新 `STRIPE_WEBHOOK_SECRET`

---

## 第五步：更新环境变量

1. 在 Vercel 项目设置中，更新：
   \`\`\`
   NEXT_PUBLIC_SITE_URL = https://你的域名.com
   \`\`\`

2. 在 Stripe 控制台，更新：
   - **Settings** → **Brand settings** → Website: `https://你的域名.com`

3. 重新部署网站：
   \`\`\`bash
   git commit --allow-empty -m "Update environment variables"
   git push
   \`\`\`

---

## 第六步：测试网站

访问你的域名，测试以下功能：

### 基础功能
- [ ] 网站能正常访问
- [ ] HTTPS 证书有效（浏览器显示🔒）
- [ ] 所有页面都能正常加载

### 产品功能
- [ ] 产品列表显示正确
- [ ] 产品详情页正常
- [ ] 图片加载正常

### 购物车功能
- [ ] 添加到购物车
- [ ] 更新数量
- [ ] 移除商品

### 支付功能（测试模式）
- [ ] 进入结账页面
- [ ] 使用测试卡号：`4242 4242 4242 4242`
- [ ] 完成测试支付
- [ ] 订单确认页面显示

### 博客功能
- [ ] 博客列表显示
- [ ] 文章内容正常

---

## 成本总结

### 第一年费用
| 项目 | 费用 |
|------|------|
| 域名 | $8-13 |
| Vercel 托管 | $0 |
| Sanity CMS | $0 |
| Stripe | $0（按交易收费）|
| SSL 证书 | $0（Vercel 免费）|
| **总计** | **$8-13** |

### 后续年度
| 项目 | 费用 |
|------|------|
| 域名续费 | $8-13 |
| 其他 | $0 |
| **总计** | **$8-13/年** |

---

## 性能优化（可选）

### 配置 Cloudflare CDN（免费）

1. 访问 [cloudflare.com](https://www.cloudflare.com/)
2. 添加你的网站
3. 更新域名的 Nameservers
4. 启用以下功能：
   - Auto Minify (CSS, JS, HTML)
   - Brotli 压缩
   - Always Use HTTPS

### 配置 Google Analytics（免费）

1. 创建 GA4 账户
2. 安装跟踪代码
3. 监控网站流量

---

## 疑难解答

### 问题：域名无法访问

**检查清单：**
- DNS 记录是否正确配置
- 等待 DNS 传播（最多 24 小时）
- 使用 [whatsmydns.net](https://www.whatsmydns.net/) 检查传播状态

### 问题：HTTPS 不工作

**解决方法：**
- Vercel 自动配置 SSL，通常 10 分钟内生效
- 确保 DNS 指向正确
- 在 Vercel 控制台检查证书状态

### 问题：环境变量不生效

**解决方法：**
- 确保变量名拼写正确
- 客户端变量必须以 `NEXT_PUBLIC_` 开头
- 修改环境变量后需要重新部署

### 问题：支付不工作

**检查清单：**
- Stripe Webhook 配置正确
- `STRIPE_WEBHOOK_SECRET` 正确
- 使用测试模式的 API 密钥

---

## 生产环境上线

当你准备接受真实支付时：

1. **Stripe 切换到生产模式**：
   - 完成 Stripe 账户认证
   - 获取生产环境 API 密钥
   - 更新 Vercel 环境变量

2. **测试真实支付**：
   - 使用小额测试
   - 验证订单流程
   - 检查邮件通知

3. **监控和维护**：
   - 设置 Vercel Analytics
   - 配置错误监控（Sentry）
   - 定期备份 Sanity 数据

---

## 下一步

✅ 网站已上线！现在你可以：

1. **添加内容**
   - 上传产品图片到 Sanity
   - 撰写博客文章
   - 完善品牌故事

2. **推广网站**
   - Instagram 宣传
   - 朋友圈分享
   - 小红书推广

3. **持续优化**
   - 分析用户行为
   - 优化产品描述
   - 改进转化率

祝你的品牌生意兴隆！🎉
