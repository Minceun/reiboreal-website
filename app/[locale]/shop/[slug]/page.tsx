import Image from 'next/image'
import AddToCartButton from '@/components/AddToCartButton'
import { ShoppingBag, Heart, Share2 } from 'lucide-react'

// 这将在集成Sanity后动态获取
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return {
    title: `产品详情 - Reiboreal`,
    description: '查看产品详细信息',
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  // 临时占位数据
  const product = {
    id: '1',
    name: '星月项链',
    price: 399,
    description: '精选925纯银打造，搭配天然淡水珍珠，展现优雅气质。',
    detailedDescription: `
      这款星月项链灵感来源于夜空中最浪漫的相遇。

      精选925纯银作为主材，经过多道工序的精细打磨，呈现温润光泽。
      天然淡水珍珠点缀其中，每一颗都经过严格挑选，确保色泽均匀、光泽饱满。

      适合日常佩戴，也可作为重要场合的点睛之笔。
    `,
    images: ['/placeholder1.jpg', '/placeholder2.jpg', '/placeholder3.jpg'],
    inStock: true,
    category: '项链',
    materials: ['925纯银', '天然淡水珍珠'],
    size: '链长: 40cm + 5cm延长链',
  }

  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 左侧 - 产品图片 */}
          <div className="space-y-4">
            {/* 主图 */}
            <div className="aspect-square bg-sand rounded-sm overflow-hidden">
              {/* 占位背景 */}
              <div className="w-full h-full bg-gradient-to-br from-sand to-taupe" />
            </div>

            {/* 缩略图 */}
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-square bg-sand rounded-sm cursor-pointer
                            hover:opacity-75 transition-opacity"
                />
              ))}
            </div>
          </div>

          {/* 右侧 - 产品信息 */}
          <div className="space-y-6">
            {/* 标题和价格 */}
            <div>
              <p className="text-charcoal/60 mb-2">{product.category}</p>
              <h1 className="text-4xl md:text-5xl font-serif mb-4">
                {product.name}
              </h1>
              <p className="text-3xl font-medium text-gold">
                ¥ {product.price}
              </p>
            </div>

            {/* 简短描述 */}
            <p className="text-lg text-charcoal/80 leading-relaxed">
              {product.description}
            </p>

            {/* 尺寸选择 */}
            <div>
              <label className="block text-sm font-medium mb-2">尺寸</label>
              <select className="input">
                <option>标准尺寸</option>
                <option>定制尺寸</option>
              </select>
            </div>

            {/* 添加到购物车 */}
            <div className="flex gap-4">
              <AddToCartButton
                product={product}
                className="flex-1"
              />
              <button
                className="btn-secondary px-4"
                aria-label="添加到收藏"
              >
                <Heart className="w-6 h-6" />
              </button>
              <button
                className="btn-secondary px-4"
                aria-label="分享"
              >
                <Share2 className="w-6 h-6" />
              </button>
            </div>

            {/* 库存状态 */}
            {product.inStock ? (
              <p className="text-sm text-green-600">✓ 现货供应</p>
            ) : (
              <p className="text-sm text-red-600">暂时缺货</p>
            )}

            {/* 产品详情 */}
            <div className="border-t border-taupe pt-6 space-y-4">
              <div>
                <h3 className="font-medium mb-2">产品详情</h3>
                <p className="text-charcoal/70 whitespace-pre-line leading-relaxed">
                  {product.detailedDescription}
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-2">材质</h3>
                <ul className="text-charcoal/70 space-y-1">
                  {product.materials.map((material, i) => (
                    <li key={i}>• {material}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-2">尺寸</h3>
                <p className="text-charcoal/70">{product.size}</p>
              </div>

              <div>
                <h3 className="font-medium mb-2">护理建议</h3>
                <ul className="text-charcoal/70 space-y-1 text-sm">
                  <li>• 避免接触化妆品、香水等化学物质</li>
                  <li>• 不佩戴时请存放于首饰盒中</li>
                  <li>• 定期用软布轻轻擦拭</li>
                  <li>• 避免碰撞和刮擦</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 推荐产品 */}
        <div className="mt-24">
          <h2 className="text-3xl font-serif mb-8">你可能也喜欢</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card p-4">
                <div className="aspect-square bg-sand mb-3" />
                <h3 className="font-medium mb-1">相关产品</h3>
                <p className="text-charcoal/60">¥ 299</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
