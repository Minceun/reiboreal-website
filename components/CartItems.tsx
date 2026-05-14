'use client'

import { useCartStore } from '@/store/cartStore'
import { X } from 'lucide-react'
import Image from 'next/image'

export default function CartItems() {
  const items = useCartStore((state) => state.items)
  const removeItem = useCartStore((state) => state.removeItem)
  const updateQuantity = useCartStore((state) => state.updateQuantity)

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-charcoal/60 mb-4">购物车是空的</p>
        <a href="/shop" className="btn-primary inline-block">
          去购物
        </a>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {items.map((item) => (
        <div key={item.id} className="card p-6 flex gap-6">
          {/* 产品图片 */}
          <div className="w-24 h-24 bg-sand rounded-sm flex-shrink-0">
            <div className="w-full h-full bg-gradient-to-br from-sand to-taupe" />
          </div>

          {/* 产品信息 */}
          <div className="flex-1">
            <div className="flex justify-between mb-2">
              <h3 className="text-lg font-serif">{item.name}</h3>
              <button
                onClick={() => removeItem(item.id)}
                className="text-charcoal/60 hover:text-charcoal"
                aria-label="移除"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-charcoal/60 mb-4">¥ {item.price}</p>

            {/* 数量调整 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center border border-taupe rounded">
                <button
                  className="px-3 py-1 hover:bg-sand transition-colors"
                  onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                >
                  -
                </button>
                <span className="px-4 py-1 border-x border-taupe min-w-[50px] text-center">
                  {item.quantity}
                </span>
                <button
                  className="px-3 py-1 hover:bg-sand transition-colors"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>

              <p className="font-medium">
                ¥ {(item.price * item.quantity).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
