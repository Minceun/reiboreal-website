import Link from 'next/link'
import { Calendar, Clock } from 'lucide-react'

export const metadata = {
  title: '品牌故事 - Reiboreal',
  description: '了解我们的设计理念和品牌故事',
}

export default function BlogPage() {
  // 临时占位数据
  const posts = [
    {
      id: '1',
      title: 'Reiboreal 的诞生故事',
      excerpt: '每个品牌背后都有一个故事，而我们的故事始于对美的追求...',
      coverImage: '/placeholder.jpg',
      date: '2024-01-15',
      readTime: '5 分钟',
      category: '品牌故事',
    },
    {
      id: '2',
      title: '如何选择适合自己的饰品',
      excerpt: '饰品不仅是装饰，更是个人风格的表达。今天分享一些选购建议...',
      coverImage: '/placeholder.jpg',
      date: '2024-01-20',
      readTime: '8 分钟',
      category: '穿搭指南',
    },
    {
      id: '3',
      title: '手工银饰的制作过程',
      excerpt: '走进我们的工作室，看看一件精美银饰是如何诞生的...',
      coverImage: '/placeholder.jpg',
      date: '2024-02-01',
      readTime: '6 分钟',
      category: '工艺揭秘',
    },
  ]

  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 页面标题 */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-serif mb-4">
            品牌故事
          </h1>
          <p className="text-lg text-charcoal/70">
            设计灵感 · 工艺分享 · 穿搭建议
          </p>
        </div>

        {/* 博客文章网格 */}
        <div className="space-y-12">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="block group"
            >
              <article className="grid md:grid-cols-5 gap-8 card p-6
                                hover:shadow-lg transition-all duration-300">
                {/* 封面图 */}
                <div className="md:col-span-2">
                  <div className="aspect-[4/3] bg-sand rounded-sm overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-sand to-taupe
                                  group-hover:scale-105 transition-transform duration-500" />
                  </div>
                </div>

                {/* 文章信息 */}
                <div className="md:col-span-3 flex flex-col justify-center">
                  <span className="text-sm text-gold font-medium mb-2">
                    {post.category}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-serif mb-3
                               group-hover:text-gold transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-charcoal/70 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-charcoal/60">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
