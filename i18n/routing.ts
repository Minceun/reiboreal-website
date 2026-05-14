import { defineRouting } from 'next-intl/routing'
import { createNavigation } from 'next-intl/navigation'

export const routing = defineRouting({
  // 支持的语言列表
  locales: ['zh', 'en'],

  // 默认语言
  defaultLocale: 'zh',

  // 语言前缀策略
  // 'as-needed' 表示默认语言不显示前缀，其他语言显示
  // 例如: /about (中文) 和 /en/about (英文)
  localePrefix: 'as-needed',
})

// 轻量级的导航 API，支持多语言路由
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing)
