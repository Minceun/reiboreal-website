# Stripe 支付配置指南

本指南将帮助你配置 Stripe 作为网站的支付系统。

## 为什么选择 Stripe？

- ✅ **无月费**：仅按交易收费
- ✅ **支持多种支付方式**：信用卡、支付宝、微信支付
- ✅ **安全可靠**：PCI DSS Level 1 认证
- ✅ **开发友好**：完善的 API 和文档

---

## 第一步：注册 Stripe 账户

1. 访问 [stripe.com](https://stripe.com/)
2. 点击 "Start now" 注册账户
3. 填写邮箱和密码
4. 验证邮箱

✅ **完全免费注册，无需信用卡**

---

## 第二步：获取 API 密钥

### 测试模式（开发阶段）

1. 登录 Stripe 控制台
2. 点击右上角的 "Developers"
3. 进入 "API keys"
4. 你会看到：

**Publishable key（可公开密钥）**:
\`\`\`
pk_test_51xxxxx
\`\`\`

**Secret key（密钥）**:
\`\`\`
sk_test_51xxxxx
\`\`\`

5. 复制这两个密钥到 `.env.local`:

\`\`\`env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51xxxxx
STRIPE_SECRET_KEY=sk_test_51xxxxx
\`\`\`

⚠️ **注意**：
- Publishable key 可以在客户端使用
- Secret key 仅在服务端使用，不要暴露

---

## 第三步：测试支付

### 测试卡号

在测试模式下，使用以下卡号进行测试：

**成功支付**:
\`\`\`
卡号: 4242 4242 4242 4242
到期: 任何未来日期（例如 12/25）
CVC: 任何3位数字（例如 123）
邮编: 任何5位数字（例如 10001）
\`\`\`

**需要验证的卡**:
\`\`\`
卡号: 4000 0025 0000 3155
\`\`\`

**支付失败**:
\`\`\`
卡号: 4000 0000 0000 9995
\`\`\`

更多测试卡号：[stripe.com/docs/testing](https://stripe.com/docs/testing)

### 测试支付流程

1. 启动开发服务器：\`npm run dev\`
2. 添加商品到购物车
3. 进入结账页面
4. 使用测试卡号完成支付
5. 在 Stripe 控制台查看交易记录

---

## 第四步：配置 Webhook

Webhook 用于接收 Stripe 的支付事件通知。

### 开发环境（本地测试）

1. 安装 Stripe CLI:

\`\`\`bash
# macOS
brew install stripe/stripe-cli/stripe

# Windows
scoop bucket add stripe https://github.com/stripe/scoop-stripe-cli.git
scoop install stripe

# Linux
wget https://github.com/stripe/stripe-cli/releases/download/v1.19.0/stripe_1.19.0_linux_x86_64.tar.gz
tar -xvf stripe_1.19.0_linux_x86_64.tar.gz
\`\`\`

2. 登录 Stripe CLI:

\`\`\`bash
stripe login
\`\`\`

3. 转发 Webhook 到本地:

\`\`\`bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
\`\`\`

4. 复制显示的 webhook signing secret:

\`\`\`
> Ready! Your webhook signing secret is whsec_xxxxx
\`\`\`

5. 添加到 `.env.local`:

\`\`\`env
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
\`\`\`

### 生产环境（网站上线后）

1. 在 Stripe 控制台，进入 "Developers" → "Webhooks"
2. 点击 "Add endpoint"
3. 输入 endpoint URL:
   \`\`\`
   https://你的域名.com/api/webhooks/stripe
   \`\`\`
4. 选择以下事件:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. 点击 "Add endpoint"
6. 复制 "Signing secret"
7. 在 Vercel 环境变量中更新 `STRIPE_WEBHOOK_SECRET`

---

## 第五步：创建 Webhook API 路由

在项目中创建 \`app/api/webhooks/stripe/route.ts\`:

\`\`\`typescript
import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    )
  }

  // 处理事件
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session
      console.log('Payment successful:', session.id)

      // TODO: 创建订单记录
      // TODO: 发送确认邮件
      // TODO: 更新库存

      break

    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.log('Payment intent succeeded:', paymentIntent.id)
      break

    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object as Stripe.PaymentIntent
      console.log('Payment failed:', failedPayment.id)
      // TODO: 通知用户支付失败
      break

    default:
      console.log(\`Unhandled event type: \${event.type}\`)
  }

  return NextResponse.json({ received: true })
}
\`\`\`

---

## 第六步：创建结账页面

创建 \`app/checkout/page.tsx\`:

\`\`\`typescript
'use client'

import { useState } from 'react'
import { useCartStore } from '@/store/cartStore'
import { useRouter } from 'next/navigation'

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false)
  const items = useCartStore((state) => state.items)
  const router = useRouter()

  const handleCheckout = async () => {
    setLoading(true)

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      })

      const { sessionId } = await response.json()

      // 重定向到 Stripe Checkout
      const stripe = await getStripe()
      await stripe?.redirectToCheckout({ sessionId })
    } catch (error) {
      console.error('Checkout error:', error)
      alert('支付失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-serif mb-8">结账</h1>

        <button
          onClick={handleCheckout}
          disabled={loading}
          className="btn-primary w-full"
        >
          {loading ? '处理中...' : '前往支付'}
        </button>
      </div>
    </div>
  )
}
\`\`\`

创建 \`app/api/checkout/route.ts\`:

\`\`\`typescript
import { NextRequest, NextResponse } from 'next/server'
import { createCheckoutSession } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  try {
    const { items } = await req.json()

    const session = await createCheckoutSession(items)

    return NextResponse.json({ sessionId: session.id })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
\`\`\`

---

## 第七步：支持支付宝和微信支付

Stripe 支持支付宝和微信支付，需要额外配置：

1. 在 Stripe 控制台，进入 "Settings" → "Payment methods"
2. 启用以下支付方式：
   - ✅ Alipay（支付宝）
   - ✅ WeChat Pay（微信支付）
   - ✅ Cards（信用卡/借记卡）

3. 更新 \`lib/stripe.ts\` 中的支付方式：

\`\`\`typescript
payment_method_types: ['card', 'alipay', 'wechat_pay']
\`\`\`

---

## 第八步：切换到生产模式

⚠️ **上线前需要完成账户认证**

### 认证步骤

1. 在 Stripe 控制台，点击 "Activate account"
2. 填写企业/个人信息：
   - 企业类型
   - 营业执照（如有）
   - 银行账户信息
   - 身份证明

3. 提交审核（通常 1-3 个工作日）

### 获取生产环境密钥

1. 审核通过后，关闭"测试模式"
2. 获取生产环境 API 密钥：
   \`\`\`
   pk_live_51xxxxx
   sk_live_51xxxxx
   \`\`\`

3. 在 Vercel 环境变量中更新：
   \`\`\`
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_51xxxxx
   STRIPE_SECRET_KEY=sk_live_51xxxxx
   \`\`\`

---

## 费用说明

### Stripe 收费标准（中国）

**信用卡/借记卡**:
- 国内卡: 2.9% + ¥2.35
- 国际卡: 3.4% + ¥2.35

**支付宝**:
- 2.9% + ¥2.35

**微信支付**:
- 2.9% + ¥2.35

**无月费、无隐藏费用**

### 示例计算

如果你卖一件 ¥299 的产品：

\`\`\`
商品价格: ¥299
Stripe 手续费: ¥299 × 2.9% + ¥2.35 = ¥11.03
你实际收到: ¥299 - ¥11.03 = ¥287.97
\`\`\`

---

## 疑难解答

### 问题：测试卡不工作

**解决方法**：
- 确保使用测试模式的 API 密钥（以 \`pk_test_\` 开头）
- 检查卡号是否完整：\`4242 4242 4242 4242\`
- 确保过期日期是未来日期

### 问题：Webhook 不触发

**解决方法**：
- 检查 Webhook URL 是否正确
- 确保服务器可以公开访问
- 查看 Stripe 控制台的 Webhook 日志

### 问题：支付成功但订单未创建

**解决方法**：
- 检查 Webhook 是否正确处理 \`checkout.session.completed\` 事件
- 查看服务器日志
- 确保 \`STRIPE_WEBHOOK_SECRET\` 正确配置

---

## 安全建议

1. **永远不要**将 \`STRIPE_SECRET_KEY\` 暴露在客户端代码中
2. 验证所有 Webhook 请求的签名
3. 在生产环境使用 HTTPS
4. 定期轮换 API 密钥
5. 监控异常交易

---

## 下一步

✅ Stripe 配置完成！继续：
- [部署网站](./DEPLOYMENT.md)
- [配置 Sanity CMS](./SANITY_SETUP.md)
