'use client'

import { useCartStore } from '@/store/cartStore'
import Link from 'next/link'

export default function CartSummary() {
  const items = useCartStore((state) => state.items)

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 500 ? 0 : 30
  const total = subtotal + shipping

  return (
    <div className="card p-6 sticky top-24">
      <h2 className="text-2xl font-serif mb-6">订单摘要</h2>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-charcoal/80">
          <span>小计</span>
          <span>¥ {subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-charcoal/80">
          <span>配送</span>
          <span>{shipping === 0 ? '免费' : `¥ ${shipping}`}</span>
        </div>
        {subtotal > 0 && subtotal < 500 && (
          <p className="text-xs text-charcoal/60">
            再购买 ¥{500 - subtotal} 即可享受免运费
          </p>
        )}
        <div className="border-t border-taupe pt-4">
          <div className="flex justify-between text-lg font-medium">
            <span>总计</span>
            <span>¥ {total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <Link href="/checkout" className="btn-primary w-full text-center block">
        去结算
      </Link>

      <p className="text-xs text-charcoal/60 text-center mt-4">
        支持微信、支付宝、信用卡支付
      </p>
    </div>
  )
}
