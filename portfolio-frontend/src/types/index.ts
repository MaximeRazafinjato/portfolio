export type Locale = 'fr' | 'en'

export interface LocalizedString {
  fr: string
  en: string
}

export interface Article {
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

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}
