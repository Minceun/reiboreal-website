'use client'

import { useState } from 'react'
import { ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import toast from 'react-hot-toast'

interface AddToCartButtonProps {
  product: {
    id: string
    name: string
    price: number
    image?: string
  }
  className?: string
}

export default function AddToCartButton({ product, className = '' }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1)
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image || '/placeholder.jpg',
      quantity,
    })
    toast.success('已添加到购物车')
  }

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {/* 数量选择 */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium">数量：</label>
        <div className="flex items-center border border-taupe rounded">
          <button
            className="px-3 py-2 hover:bg-sand transition-colors"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            -
          </button>
          <span className="px-4 py-2 border-x border-taupe min-w-[60px] text-center">
            {quantity}
          </span>
          <button
            className="px-3 py-2 hover:bg-sand transition-colors"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </button>
        </div>
      </div>

      {/* 添加到购物车按钮 */}
      <button
        onClick={handleAddToCart}
        className="btn-primary w-full flex items-center justify-center gap-2"
      >
        <ShoppingBag className="w-5 h-5" />
        加入购物车
      </button>
    </div>
  )
}
