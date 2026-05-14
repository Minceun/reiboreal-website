import CartItems from '@/components/CartItems'
import CartSummary from '@/components/CartSummary'
import Link from 'next/link'

export const metadata = {
  title: '购物车 - Reiboreal',
  description: '查看您的购物车',
}

export default function CartPage() {
  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif mb-12">
          购物车
        </h1>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* 购物车商品列表 */}
          <div className="lg:col-span-2">
            <CartItems />
          </div>

          {/* 订单摘要 */}
          <div className="lg:col-span-1">
            <CartSummary />
          </div>
        </div>

        {/* 继续购物 */}
        <div className="mt-12 text-center">
          <Link href="/shop" className="link-underline text-charcoal/70">
            ← 继续浏览产品
          </Link>
        </div>
      </div>
    </div>
  )
}
