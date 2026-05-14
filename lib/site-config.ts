/**
 * 站点配置工具函数
 * 支持动态域名切换，方便从 Vercel 免费域名迁移到自定义域名
 */

/**
 * 获取当前站点的完整 URL
 * 优先级：
 * 1. NEXT_PUBLIC_SITE_URL 环境变量
 * 2. Vercel 自动提供的 URL
 * 3. 本地开发环境
 */
export function getSiteURL(): string {
  // 优先使用配置的站点 URL
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL
  }

  // Vercel 自动部署环境
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  }

  // 本地开发环境
  return 'http://localhost:3000'
}

/**
 * 获取绝对路径 URL
 * @param path 相对路径，如 '/shop' 或 '/blog/post-1'
 * @returns 完整的 URL
 */
export function getAbsoluteURL(path: string): string {
  const siteURL = getSiteURL()
  // 确保路径以 / 开头
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${siteURL}${normalizedPath}`
}

/**
 * 站点元数据配置
 */
export const siteConfig = {
  name: 'Reiboreal',
  description: '精致饰品，点缀生活',
  url: getSiteURL(),
  ogImage: '/og-image.jpg',
  links: {
    twitter: 'https://twitter.com/reiboreal',
    instagram: 'https://instagram.com/reiboreal',
  },
}
