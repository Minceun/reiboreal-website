import ProductGrid from '@/components/ProductGrid'
import ProductFilters from '@/components/ProductFilters'
import { useTranslations } from 'next-intl'

export default function ShopPage() {
  const t = useTranslations('shop')

  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* 页面标题 */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-serif mb-4">
            {t('title')}
          </h1>
          <p className="text-lg text-charcoal/70">
            {t('subtitle')}
          </p>
        </div>

        {/* 筛选器和产品网格 */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* 侧边栏筛选 */}
          <aside className="lg:w-64 flex-shrink-0">
            <ProductFilters />
          </aside>

          {/* 产品网格 */}
          <div className="flex-1">
            <ProductGrid />
          </div>
        </div>
      </div>
    </div>
  )
}
