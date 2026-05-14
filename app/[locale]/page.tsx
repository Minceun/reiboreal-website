import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { ArrowRight } from 'lucide-react'
import HeroVideo from '@/components/HeroVideo'

export default function Home() {
  const t = useTranslations('home')

  return (
    <div className="w-full">
      {/* Hero 区域 - 全屏视频背景 */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <HeroVideo />

        <div className="relative z-10 text-center px-4">
          <h1 className="text-6xl md:text-8xl font-serif mb-6 tracking-tight text-white drop-shadow-lg">
            {t('title')}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-light drop-shadow-md">
            {t('subtitle')}
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 btn-primary group bg-white text-charcoal hover:bg-cream"
          >
            {t('cta')}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 向下滚动指示 */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2" />
          </div>
        </div>
      </section>

      {/* 品牌理念 */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif mb-6">
            {t('brandPhilosophy.title')}
          </h2>
          <p className="text-lg text-charcoal/70 leading-relaxed">
            {t('brandPhilosophy.description')}
          </p>
        </div>
      </section>

      {/* 精选产品展示 */}
      <section className="py-24 px-4 bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-4xl md:text-5xl font-serif">
              {t('featured.title')}
            </h2>
            <Link href="/shop" className="link-underline">
              {t('featured.viewAll')} →
            </Link>
          </div>

          {/* 产品网格占位 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card p-4 group cursor-pointer">
                <div className="aspect-square bg-sand mb-4 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-taupe to-sand
                                group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h3 className="text-xl font-serif mb-2">产品名称</h3>
                <p className="text-charcoal/60 mb-2">简短描述</p>
                <p className="text-lg font-medium">¥ 299</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram 风格画廊 */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif mb-12 text-center">
            {t('instagram.title')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="aspect-square bg-sand hover:opacity-80
                          transition-opacity cursor-pointer"
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA 区域 */}
      <section className="py-24 px-4 bg-charcoal text-cream">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif mb-6">
            {t('newsletter.title')}
          </h2>
          <p className="text-lg mb-8 opacity-90">
            {t('newsletter.description')}
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder={t('newsletter.placeholder')}
              className="input flex-1 text-charcoal"
            />
            <button type="submit" className="btn-primary bg-cream text-charcoal
                                            hover:bg-opacity-90">
              {t('newsletter.button')}
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
