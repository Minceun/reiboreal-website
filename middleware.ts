import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  // 匹配所有路径，除了以下几种：
  // - api (API 路由)
  // - _next/static (静态文件)
  // - _next/image (图片优化)
  // - favicon.ico (网站图标)
  // - 媒体文件 (.mp4, .webm, .jpg, .png, 等)
  matcher: ['/', '/(zh|en)/:path*', '/((?!api|_next/static|_next/image|favicon.ico|.*\\.mp4|.*\\.webm|.*\\.jpg|.*\\.png|.*\\.gif).*)'],
}
