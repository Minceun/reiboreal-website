'use client'

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/routing'
import { locales, localeNames, localeFlags, type Locale } from '@/i18n/config'
import { useState } from 'react'
import { Globe } from 'lucide-react'

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const handleChangeLocale = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale })
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 hover:text-gold transition-colors"
        aria-label="切换语言"
      >
        <Globe className="w-5 h-5" />
        <span className="text-sm hidden sm:inline">{localeNames[locale]}</span>
      </button>

      {isOpen && (
        <>
          {/* 背景遮罩 */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* 语言选择菜单 */}
          <div className="absolute right-0 top-full mt-2 bg-white shadow-lg rounded-sm
                        border border-sand overflow-hidden z-50 min-w-[140px]">
            {locales.map((loc) => (
              <button
                key={loc}
                onClick={() => handleChangeLocale(loc)}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-sand
                          transition-colors text-left ${
                            locale === loc ? 'bg-cream text-gold font-medium' : 'text-charcoal'
                          }`}
              >
                <span className="text-lg">{localeFlags[loc]}</span>
                <span>{localeNames[loc]}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
