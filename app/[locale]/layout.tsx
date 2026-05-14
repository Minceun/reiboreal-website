import type { Metadata } from 'next'
import { Inter, Playfair_Display, DM_Sans, IBM_Plex_Mono } from 'next/font/google'
import '../globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Toaster } from 'react-hot-toast'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'

// 英文字体 - 参考 mejuri.com
// 大标题字体 - 粗体无衬线
const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
})

// 正文字体 - 等宽打字机风格
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-ibm-mono',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

// 中文字体
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Reiboreal - 精致手工饰品',
  description: '探索独特设计的手工饰品，每一件都讲述着属于你的故事',
  keywords: ['饰品', '珠宝', '手工', '设计师品牌', 'jewelry', 'accessories'],
  openGraph: {
    title: 'Reiboreal - 精致手工饰品',
    description: '探索独特设计的手工饰品',
    type: 'website',
    locale: 'zh_CN',
  },
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  // 确保传入的 locale 是有效的
  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  // 获取当前语言的翻译消息
  const messages = await getMessages()

  return (
    <html lang={locale} className={`${inter.variable} ${playfair.variable} ${dmSans.variable} ${ibmPlexMono.variable}`}>
      <body className={locale === 'en' ? 'font-en' : ''}>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#2C2C2C',
                color: '#FAF8F5',
              },
            }}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
