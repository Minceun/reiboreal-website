import Stripe from 'stripe'
import { loadStripe, Stripe as StripeJS } from '@stripe/stripe-js'
import { getAbsoluteURL } from './site-config'

// 服务端 Stripe 实例
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-02-24.acacia',
})

// 客户端 Stripe 实例
let stripePromise: Promise<StripeJS | null>
export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '')
  }
  return stripePromise
}

// 创建 Checkout Session
export async function createCheckoutSession(items: any[]) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card', 'alipay', 'wechat_pay'],
    line_items: items.map((item) => ({
      price_data: {
        currency: 'cny',
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [],
        },
        unit_amount: item.price * 100, // Stripe 使用分作为单位
      },
      quantity: item.quantity,
    })),
    mode: 'payment',
    success_url: `${getAbsoluteURL('/success')}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: getAbsoluteURL('/cart'),
    shipping_address_collection: {
      allowed_countries: ['CN', 'US', 'GB', 'AU', 'CA'],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 3000, // 30元运费
            currency: 'cny',
          },
          display_name: '标准配送',
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 3,
            },
            maximum: {
              unit: 'business_day',
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 0,
            currency: 'cny',
          },
          display_name: '满500免运费',
        },
      },
    ],
  })

  return session
}

// 验证 Webhook 签名
export function constructEvent(payload: string | Buffer, signature: string) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ''
  return stripe.webhooks.constructEvent(payload, signature, webhookSecret)
}
