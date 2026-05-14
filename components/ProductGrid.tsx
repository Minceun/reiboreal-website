'use client'

import { useState } from 'react'
import ProductCard from './ProductCard'

// 临时占位数据
const mockProducts = [
  { id: '1', name: '星月项链', price: 399, image: '/placeholder.jpg', slug: 'star-moon-necklace', category: '项链' },
  { id: '2', name: '珍珠耳环', price: 299, image: '/placeholder.jpg', slug: 'pearl-earrings', category: '耳环' },
  { id: '3', name: '简约手链', price: 259, image: '/placeholder.jpg', slug: 'simple-bracelet', category: '手链' },
  { id: '4', name: '几何戒指', price: 199, image: '/placeholder.jpg', slug: 'geometric-ring', category: '戒指' },
  { id: '5', name: '月光石吊坠', price: 459, image: '/placeholder.jpg', slug: 'moonstone-pendant', category: '项链' },
  { id: '6', name: '螺旋耳钉', price: 179, image: '/placeholder.jpg', slug: 'spiral-studs', category: '耳环' },
  { id: '7', name: '编织手链', price: 329, image: '/placeholder.jpg', slug: 'braided-bracelet', category: '手链' },
  { id: '8', name: '开口戒指', price: 229, image: '/placeholder.jpg', slug: 'open-ring', category: '戒指' },
]

export default function ProductGrid() {
  const [products] = useState(mockProducts)

  return (
    <div>
      {/* 结果数量和排序 */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-charcoal/70">
          共 {products.length} 件产品
        </p>
        <select className="input py-2 px-4">
          <option>默认排序</option>
          <option>价格从低到高</option>
          <option>价格从高到低</option>
          <option>最新上架</option>
        </select>
      </div>

      {/* 产品网格 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* 加载更多 */}
      <div className="mt-12 text-center">
        <button className="btn-secondary">
          加载更多
        </button>
      </div>
    </div>
  )
}
