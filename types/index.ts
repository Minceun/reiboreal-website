// 产品类型
export interface Product {
  _id: string
  name: string
  slug: {
    current: string
  }
  price: number
  description?: string
  detailedDescription?: string
  images: any[]
  category: {
    name: string
  }
  materials?: string[]
  size?: string
  inStock: boolean
  related?: Product[]
}

// 博客文章类型
export interface Post {
  _id: string
  title: string
  slug: {
    current: string
  }
  excerpt: string
  content: any[]
  coverImage: any
  publishedAt: string
  readTime: string
  category: string
  author?: {
    name: string
    bio?: string
    image?: any
  }
}

// 分类类型
export interface Category {
  _id: string
  name: string
  slug: {
    current: string
  }
}

// 购物车项目类型
export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

// 订单类型
export interface Order {
  id: string
  orderNumber: string
  customer: {
    name: string
    email: string
    phone?: string
  }
  items: CartItem[]
  subtotal: number
  shipping: number
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  stripePaymentId: string
  shippingAddress: {
    line1: string
    line2?: string
    city: string
    state?: string
    postal_code: string
    country: string
  }
  createdAt: string
  updatedAt: string
}
