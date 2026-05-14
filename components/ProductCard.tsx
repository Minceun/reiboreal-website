import Link from 'next/link'
import Image from 'next/image'
import { Heart } from 'lucide-react'

interface ProductCardProps {
  product: {
    id: string
    name: string
    price: number
    image: string
    slug: string
    category?: string
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/shop/${product.slug}`} className="group">
      <div className="card p-4">
        {/* 产品图片 */}
        <div className="relative aspect-square mb-4 overflow-hidden rounded-sm bg-sand">
          {/* 占位背景 - 稍后替换为实际图片 */}
          <div className="w-full h-full bg-gradient-to-br from-sand to-taupe
                        group-hover:scale-110 transition-transform duration-500" />

          {/* 收藏按钮 */}
          <button
            className="absolute top-3 right-3 w-10 h-10 bg-white/90 rounded-full
                     flex items-center justify-center opacity-0 group-hover:opacity-100
                     transition-opacity hover:bg-white"
            onClick={(e) => {
              e.preventDefault()
              // TODO: 实现收藏功能
            }}
            aria-label="添加到收藏"
          >
            <Heart className="w-5 h-5" />
          </button>
        </div>

        {/* 产品信息 */}
        <div>
          {product.category && (
            <p className="text-xs text-charcoal/60 mb-1 uppercase tracking-wide">
              {product.category}
            </p>
          )}
          <h3 className="text-lg font-serif mb-2 group-hover:text-gold transition-colors">
            {product.name}
          </h3>
          <p className="text-lg font-medium text-charcoal">
            ¥ {product.price.toLocaleString()}
          </p>
        </div>
      </div>
    </Link>
  )
}
