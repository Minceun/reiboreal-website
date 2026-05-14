import { Instagram, Facebook, Mail } from 'lucide-react'
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'

export default function Footer() {
  const t = useTranslations('footer')
  const tNav = useTranslations('nav')

  return (
    <footer className="bg-charcoal text-cream">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* 品牌信息 */}
          <div>
            <h3 className="text-2xl font-serif mb-4">Reiboreal</h3>
            <p className="text-cream/70 text-sm leading-relaxed">
              {t('description')}
            </p>
          </div>

          {/* 快速链接 */}
          <div>
            <h4 className="font-medium mb-4">{t('quickLinks')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shop" className="text-cream/70 hover:text-cream transition-colors">
                  {tNav('shop')}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-cream/70 hover:text-cream transition-colors">
                  {tNav('blog')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-cream/70 hover:text-cream transition-colors">
                  {tNav('about')}
                </Link>
              </li>
            </ul>
          </div>

          {/* 客户服务 */}
          <div>
            <h4 className="font-medium mb-4">{t('customerService')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shipping" className="text-cream/70 hover:text-cream transition-colors">
                  {t('shipping')}
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-cream/70 hover:text-cream transition-colors">
                  {t('returns')}
                </Link>
              </li>
              <li>
                <Link href="/care" className="text-cream/70 hover:text-cream transition-colors">
                  {t('care')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-cream/70 hover:text-cream transition-colors">
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* 社交媒体 */}
          <div>
            <h4 className="font-medium mb-4">{t('followUs')}</h4>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/reiboreal"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-cream/10 rounded-full flex items-center
                         justify-center hover:bg-cream/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com/reiboreal"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-cream/10 rounded-full flex items-center
                         justify-center hover:bg-cream/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="mailto:hello@reiboreal.com"
                className="w-10 h-10 bg-cream/10 rounded-full flex items-center
                         justify-center hover:bg-cream/20 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* 底部版权 */}
        <div className="border-t border-cream/10 pt-8 flex flex-col md:flex-row
                      justify-between items-center gap-4 text-sm text-cream/60">
          <p>{t('copyright')}</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-cream transition-colors">
              {t('privacy')}
            </Link>
            <Link href="/terms" className="hover:text-cream transition-colors">
              {t('terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
