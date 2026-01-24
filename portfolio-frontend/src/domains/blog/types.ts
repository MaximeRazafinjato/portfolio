import { z } from 'zod'

export const articleFormSchema = z.object({
  title: z.string().min(3, 'Le titre doit contenir au moins 3 caractères'),
  titleEn: z.string().min(3, 'Le titre anglais doit contenir au moins 3 caractères'),
  content: z.string().min(50, 'Le contenu doit contenir au moins 50 caractères'),
  contentEn: z.string().min(50, 'Le contenu anglais doit contenir au moins 50 caractères'),
  excerpt: z.string().min(10, 'L\'extrait doit contenir au moins 10 caractères').max(300, 'L\'extrait ne doit pas dépasser 300 caractères'),
  excerptEn: z.string().min(10, 'L\'extrait anglais doit contenir au moins 10 caractères').max(300, 'L\'extrait anglais ne doit pas dépasser 300 caractères'),
  coverImageUrl: z.string().url('URL invalide').optional().or(z.literal('')),
  tags: z.string().optional(),
  isPublished: z.boolean(),
})

export type ArticleFormData = z.infer<typeof articleFormSchema>

export interface ArticleListItem {
  id: string
  title: string
  titleEn: string
  slug: string
  excerpt: string
  excerptEn: string
  isPublished: boolean
  createdAt: string
  publishedAt?: string
}

export interface ArticleDetail {
  id: string
  title: string
  titleEn: string
  slug: string
  content: string
  contentEn: string
  excerpt: string
  excerptEn: string
  coverImageUrl?: string
  tags: string[]
  isPublished: boolean
  createdAt: string
  publishedAt?: string
  updatedAt?: string
}

export interface PaginatedArticles {
  items: ArticleListItem[]
  totalCount: number
  pageNumber: number
  pageSize: number
  totalPages: number
}

export interface CreateArticleRequest {
  title: string
  titleEn: string
  content: string
  contentEn: string
  excerpt: string
  excerptEn: string
  coverImageUrl?: string
  tags: string[]
  isPublished: boolean
}

export interface UpdateArticleRequest extends CreateArticleRequest {
  id: string
}
