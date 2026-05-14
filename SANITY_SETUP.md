# Sanity CMS 配置指南

本指南将帮助你设置 Sanity CMS 作为网站的内容管理系统。

## 第一步：创建 Sanity 账户

1. 访问 [sanity.io](https://www.sanity.io/)
2. 点击 "Get started"
3. 使用 GitHub 或 Google 账户注册（免费）

## 第二步：安装 Sanity CLI

在终端中运行：

\`\`\`bash
npm install -g @sanity/cli
\`\`\`

## 第三步：创建 Sanity 项目

\`\`\`bash
# 在项目根目录外创建一个新文件夹
cd ..
mkdir reiboreal-studio
cd reiboreal-studio

# 初始化 Sanity 项目
sanity init

# 按照提示操作：
# - Login? Yes
# - Create new project? Yes
# - Project name: reiboreal
# - Use default dataset? Yes
# - Output path: 保持默认
# - Select project template: Clean project with no predefined schemas
\`\`\`

## 第四步：配置 Schema（数据模型）

在 `reiboreal-studio/schemas` 文件夹中创建以下文件：

### 1. product.js (产品)

\`\`\`javascript
export default {
  name: 'product',
  title: '产品',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: '产品名称',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'URL路径',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'images',
      title: '产品图片',
      type: 'array',
      of: [{ type: 'image' }],
      validation: Rule => Rule.required().min(1)
    },
    {
      name: 'price',
      title: '价格',
      type: 'number',
      validation: Rule => Rule.required().min(0)
    },
    {
      name: 'description',
      title: '简短描述',
      type: 'text',
      rows: 3
    },
    {
      name: 'detailedDescription',
      title: '详细描述',
      type: 'text',
      rows: 10
    },
    {
      name: 'category',
      title: '分类',
      type: 'reference',
      to: [{ type: 'category' }]
    },
    {
      name: 'materials',
      title: '材质',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'size',
      title: '尺寸',
      type: 'string'
    },
    {
      name: 'inStock',
      title: '是否有货',
      type: 'boolean',
      initialValue: true
    }
  ],
  preview: {
    select: {
      title: 'name',
      media: 'images.0',
      subtitle: 'price'
    },
    prepare(selection) {
      const { title, media, subtitle } = selection
      return {
        title,
        media,
        subtitle: \`¥\${subtitle}\`
      }
    }
  }
}
\`\`\`

### 2. category.js (分类)

\`\`\`javascript
export default {
  name: 'category',
  title: '分类',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: '分类名称',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'URL路径',
      type: 'slug',
      options: {
        source: 'name'
      }
    }
  ]
}
\`\`\`

### 3. post.js (博客文章)

\`\`\`javascript
export default {
  name: 'post',
  title: '博客文章',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: '标题',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'URL路径',
      type: 'slug',
      options: {
        source: 'title'
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'excerpt',
      title: '摘要',
      type: 'text',
      rows: 3
    },
    {
      name: 'coverImage',
      title: '封面图片',
      type: 'image'
    },
    {
      name: 'content',
      title: '内容',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image' }
      ]
    },
    {
      name: 'category',
      title: '分类',
      type: 'string',
      options: {
        list: [
          { title: '品牌故事', value: '品牌故事' },
          { title: '穿搭指南', value: '穿搭指南' },
          { title: '工艺揭秘', value: '工艺揭秘' }
        ]
      }
    },
    {
      name: 'readTime',
      title: '阅读时长',
      type: 'string',
      placeholder: '例如：5 分钟'
    },
    {
      name: 'publishedAt',
      title: '发布日期',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }
  ],
  orderings: [
    {
      title: '发布日期, 新到旧',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }]
    }
  ]
}
\`\`\`

### 4. schema.js (导入所有 schema)

编辑 `reiboreal-studio/schemas/schema.js`:

\`\`\`javascript
import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import product from './product'
import category from './category'
import post from './post'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    product,
    category,
    post
  ])
})
\`\`\`

## 第五步：启动 Sanity Studio

\`\`\`bash
cd reiboreal-studio
sanity start
\`\`\`

访问 http://localhost:3333 查看 Sanity Studio

## 第六步：部署 Sanity Studio（可选）

\`\`\`bash
sanity deploy
\`\`\`

这将部署你的 Studio 到 `https://your-project.sanity.studio`

## 第七步：获取 API 凭证

1. 访问 [manage.sanity.io](https://manage.sanity.io/)
2. 选择你的项目
3. 进入 **API** 标签
4. 创建新的 Token:
   - Name: Website
   - Permissions: Viewer (如果需要写入数据，选择 Editor)
5. 复制 Token 并保存到 `.env.local`:

\`\`\`env
NEXT_PUBLIC_SANITY_PROJECT_ID=你的项目ID (在项目设置中找到)
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=你刚创建的Token
\`\`\`

## 第八步：添加测试数据

在 Sanity Studio 中：

1. 创建几个分类（项链、耳环、手链等）
2. 添加产品：
   - 上传产品图片
   - 填写名称、价格、描述
   - 选择分类
   - 点击"Publish"

3. 添加博客文章：
   - 上传封面图片
   - 填写标题和内容
   - 点击"Publish"

## 免费额度

Sanity 免费层包括：
- ✅ 无限用户
- ✅ 3个数据集
- ✅ 10GB 带宽/月
- ✅ 500K API 请求/月
- ✅ 10GB 资源存储

**对于个人品牌网站完全足够！**

## 疑难解答

### 问题：无法连接到 Sanity

确保环境变量正确配置，特别是 `NEXT_PUBLIC_SANITY_PROJECT_ID`

### 问题：图片无法显示

检查 `next.config.js` 中的 `remotePatterns` 是否包含 `cdn.sanity.io`

### 问题：内容更新不显示

Sanity 使用 CDN 缓存，可能需要几分钟更新。你可以：
- 在开发环境使用 `useCdn: false`
- 或者等待 CDN 更新

## 下一步

配置完成后，你的网站将自动从 Sanity 获取内容。继续查看：
- [Stripe 配置](./STRIPE_SETUP.md)
- [部署指南](./DEPLOYMENT.md)
