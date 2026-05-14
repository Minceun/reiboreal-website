'use client'

import { useState } from 'react'

export default function ProductFilters() {
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])

  const categories = ['项链', '耳环', '手链', '戒指', '胸针']
  const materials = ['925纯银', '黄铜', '天然珍珠', '水晶', '半宝石']

  return (
    <div className="space-y-8">
      {/* 分类筛选 */}
      <div>
        <h3 className="font-medium mb-4">产品分类</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                value={category}
                checked={selectedCategory === category}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-4 h-4 accent-charcoal"
              />
              <span className="text-charcoal/80 hover:text-charcoal">
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* 材质筛选 */}
      <div>
        <h3 className="font-medium mb-4">材质</h3>
        <div className="space-y-2">
          {materials.map((material) => (
            <label key={material} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 accent-charcoal"
              />
              <span className="text-charcoal/80 hover:text-charcoal">
                {material}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* 价格区间 */}
      <div>
        <h3 className="font-medium mb-4">价格区间</h3>
        <div className="space-y-4">
          <input
            type="range"
            min="0"
            max="1000"
            step="50"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
            className="w-full accent-charcoal"
          />
          <div className="flex justify-between text-sm text-charcoal/70">
            <span>¥ {priceRange[0]}</span>
            <span>¥ {priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* 清除筛选 */}
      <button
        className="w-full text-center text-charcoal/70 hover:text-charcoal
                 underline text-sm"
        onClick={() => {
          setSelectedCategory('')
          setPriceRange([0, 1000])
        }}
      >
        清除所有筛选
      </button>
    </div>
  )
}
