import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Sanity 客户端配置
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
})

// 图片URL构建器
const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// GROQ 查询示例

// 获取所有产品
export async function getAllProducts() {
  const query = `*[_type == "product"] | order(_createdAt desc) {
    _id,
    name,
    slug,
    price,
    "image": images[0],
    category->{name},
    inStock
  }`
  return await client.fetch(query)
}

// 根据 slug 获取单个产品
export async function getProductBySlug(slug: string) {
  const query = `*[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    price,
    description,
    detailedDescription,
    images,
    category->{name},
    materials,
    size,
    inStock,
    "related": *[_type == "product" && category._ref == ^.category._ref && _id != ^._id][0...4] {
      _id,
      name,
      slug,
      price,
      "image": images[0]
    }
  }`
  return await client.fetch(query, { slug })
}

// 获取所有博客文章
export async function getAllPosts() {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    publishedAt,
    readTime,
    category
  }`
  return await client.fetch(query)
}

// 根据 slug 获取单篇博客
export async function getPostBySlug(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    content,
    coverImage,
    publishedAt,
    readTime,
    category,
    author->{name, bio, image}
  }`
  return await client.fetch(query, { slug })
}

// 获取产品分类
export async function getCategories() {
  const query = `*[_type == "category"] {
    _id,
    name,
    slug
  }`
  return await client.fetch(query)
}
