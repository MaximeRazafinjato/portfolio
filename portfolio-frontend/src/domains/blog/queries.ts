import { useQuery } from '@tanstack/react-query'
import { api, API_ENDPOINTS } from '@/lib/api'
import { BLOG_QUERY_KEYS } from './constants'
import type { PaginatedArticles, ArticleDetail } from './types'

interface UseArticlesParams {
  page?: number
  pageSize?: number
  includeUnpublished?: boolean
}

export function useArticlesQuery(params: UseArticlesParams = {}) {
  const { page = 1, pageSize = 10, includeUnpublished = false } = params

  return useQuery({
    queryKey: BLOG_QUERY_KEYS.list({ page, pageSize }),
    queryFn: async () => {
      const response = await api.get<PaginatedArticles>(API_ENDPOINTS.articles, {
        params: { page, pageSize, includeUnpublished },
      })
      return response.data
    },
  })
}

export function useArticleByIdQuery(id: string | undefined) {
  return useQuery({
    queryKey: BLOG_QUERY_KEYS.detail(id || ''),
    queryFn: async () => {
      const response = await api.get<ArticleDetail>(API_ENDPOINTS.articleById(id!))
      return response.data
    },
    enabled: Boolean(id),
  })
}

export function useArticleBySlugQuery(slug: string | undefined) {
  return useQuery({
    queryKey: BLOG_QUERY_KEYS.bySlug(slug || ''),
    queryFn: async () => {
      const response = await api.get<ArticleDetail>(API_ENDPOINTS.articleBySlug(slug!))
      return response.data
    },
    enabled: Boolean(slug),
  })
}
