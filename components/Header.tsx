'use client'

import { useState, useEffect } from 'react'
import { ShoppingBag, Menu, X, Search } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import LanguageSwitcher from './LanguageSwitcher'
import { useLocale } from 'next-intl'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showBanner, setShowBanner] = useState(true)
  const t = useTranslations('nav')
  const locale = useLocale()
  const itemCount = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  )

  // 避免 hydration 错误 - 等待客户端挂载
  useEffect(() => {
    setMounted(true)
  }, [])

  // 监听滚动，判断横幅显示和导航栏背景
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      // 横幅：滚动超过 10px 就隐藏
      setShowBanner(scrollY < 10)
      // 导航栏背景：超过视频区域就变黑
      const heroHeight = window.innerHeight - (scrollY < 10 ? 32 : 0)
      setScrolled(scrollY > heroHeight)
    }

    handleScroll() // 初始执行一次
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: t('home'), href: '/' },
    { name: t('shop'), href: '/shop' },
    { name: t('blog'), href: '/blog' },
    { name: t('about'), href: '/about' },
  ]

  const isEnglish = locale === 'en'

  return (
    <>
      {/* 顶部促销横幅 - mejuri 风格 */}
      <div className={`fixed left-0 right-0 z-50 bg-black text-cream text-center py-1.5 transition-all duration-300 ${
        showBanner ? 'top-0 opacity-100' : '-top-10 opacity-0'
      }`}>
        <p
          className={`font-sans ${isEnglish ? 'tracking-wider' : 'tracking-wide'}`}
          style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: isEnglish ? '9px' : '11px'
          }}
        >
          {isEnglish ? 'New Collection Available. ' : '新品上架 '}
          <Link href="/shop" className="underline hover:opacity-80">
            {isEnglish ? 'Shop Now' : '立即选购'}
          </Link>
        </p>
      </div>

      {/* 主导航栏 */}
      <header className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
        showBanner ? 'top-[32px]' : 'top-0'
      } ${scrolled ? 'bg-black' : 'bg-transparent'}`}>
        <nav className="max-w-full px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className={`text-2xl hover:opacity-70 transition-all ${
                scrolled ? 'text-cream' : 'text-white'
              } ${isEnglish ? 'font-heading font-bold tracking-widest' : 'font-serif'}`}
            >
              {isEnglish ? 'REIBOREAL' : 'Reiboreal'}
            </Link>

            {/* 中间导航菜单 - 桌面端 */}
            <div className="hidden lg:flex items-center gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`hover:opacity-70 transition-all ${
                    scrolled ? 'text-cream' : 'text-white'
                  } ${isEnglish ? 'uppercase tracking-wider text-sm font-medium' : ''}`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* 右侧工具栏 */}
            <div className={`flex items-center gap-4 transition-all ${
              scrolled ? 'text-cream' : 'text-white'
            }`}>
              {/* 搜索框 - 桌面端 */}
              {searchOpen ? (
                <div className={`hidden md:flex items-center gap-2 border-b pb-1 ${
                  scrolled ? 'border-cream/50' : 'border-white/50'
                }`}>
                  <Search className={`w-4 h-4 ${scrolled ? 'text-cream/80' : 'text-white/80'}`} />
                  <input
                    type="text"
                    placeholder={isEnglish ? 'SEARCH' : '搜索'}
                    className={`bg-transparent outline-none w-40 text-sm uppercase tracking-wider ${
                      scrolled ? 'text-cream placeholder:text-cream/50' : 'text-white placeholder:text-white/50'
                    }`}
                    autoFocus
                    onBlur={() => setSearchOpen(false)}
                  />
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="hidden md:flex items-center gap-1 hover:opacity-70 transition-opacity"
                >
                  <Search className="w-4 h-4" />
                  <span className={`text-sm ${isEnglish ? 'uppercase tracking-wider' : ''}`}>
                    {isEnglish ? 'SEARCH' : '搜索'}
                  </span>
                </button>
              )}

              {/* 语言切换 */}
              <LanguageSwitcher />

              {/* 购物车 */}
              <Link
                href="/cart"
                className="p-2 hover:opacity-70 transition-opacity relative"
                aria-label={isEnglish ? 'Shopping Bag' : '购物袋'}
              >
                <ShoppingBag className="w-5 h-5" />
                {mounted && itemCount > 0 && (
                  <span className={`absolute -top-1 -right-1 w-5 h-5 text-xs rounded-full flex items-center
                                 justify-center font-medium transition-all ${
                    scrolled ? 'bg-cream text-charcoal' : 'bg-white text-charcoal'
                  }`}>
                    {itemCount}
                  </span>
                )}
              </Link>

              {/* 移动端菜单按钮 */}
              <button
                className="lg:hidden p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="菜单"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* 移动端菜单 */}
          {mobileMenuOpen && (
            <div className={`lg:hidden pt-4 pb-2 border-t mt-4 ${
              scrolled ? 'border-cream/20' : 'border-white/20'
            }`}>
              <div className="flex flex-col gap-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`py-2 hover:opacity-70 transition-all ${
                      scrolled ? 'text-cream' : 'text-white'
                    } ${isEnglish ? 'uppercase tracking-wider' : ''}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  )
}
