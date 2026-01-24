import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api, API_ENDPOINTS } from '@/lib/api'
import { BLOG_QUERY_KEYS } from './constants'
import type { CreateArticleRequest, UpdateArticleRequest, ArticleDetail } from './types'

export function useCreateArticleMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateArticleRequest) => {
      const response = await api.post<ArticleDetail>(API_ENDPOINTS.articles, data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BLOG_QUERY_KEYS.all })
    },
  })
}

export function useUpdateArticleMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, ...data }: UpdateArticleRequest) => {
      const response = await api.put<ArticleDetail>(API_ENDPOINTS.articleById(id), data)
      return response.data
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: BLOG_QUERY_KEYS.all })
      queryClient.invalidateQueries({ queryKey: BLOG_QUERY_KEYS.detail(variables.id) })
    },
  })
}

export function useDeleteArticleMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(API_ENDPOINTS.articleById(id))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BLOG_QUERY_KEYS.all })
    },
  })
}

export function useTogglePublishMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, isPublished }: { id: string; isPublished: boolean }) => {
      const response = await api.put<ArticleDetail>(API_ENDPOINTS.articleById(id), { isPublished })
      return response.data
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: BLOG_QUERY_KEYS.all })
      queryClient.invalidateQueries({ queryKey: BLOG_QUERY_KEYS.detail(variables.id) })
    },
  })
}
