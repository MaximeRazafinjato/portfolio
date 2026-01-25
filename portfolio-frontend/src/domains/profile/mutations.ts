import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api, API_ENDPOINTS } from '@/lib/api'
import { PROFILE_QUERY_KEYS } from './constants'
import type { PersonalInfo, SocialLink, Language } from './types'

export function useUpsertPersonalInfoMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: PersonalInfo) => {
      const response = await api.put<{ id: string }>(API_ENDPOINTS.personalInfo, data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEYS.personalInfo })
    },
  })
}

export function useCreateSocialLinkMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: Omit<SocialLink, 'id'>) => {
      const response = await api.post<{ id: string }>(API_ENDPOINTS.socialLinks, data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEYS.socialLinks })
    },
  })
}

export function useUpdateSocialLinkMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, ...data }: SocialLink & { id: string }) => {
      await api.put(API_ENDPOINTS.socialLinkById(id), data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEYS.socialLinks })
    },
  })
}

export function useDeleteSocialLinkMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(API_ENDPOINTS.socialLinkById(id))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEYS.socialLinks })
    },
  })
}

export function useCreateLanguageMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: Omit<Language, 'id'>) => {
      const response = await api.post<{ id: string }>(API_ENDPOINTS.languages, data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEYS.languages })
    },
  })
}

export function useUpdateLanguageMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, ...data }: Language & { id: string }) => {
      await api.put(API_ENDPOINTS.languageById(id), data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEYS.languages })
    },
  })
}

export function useDeleteLanguageMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(API_ENDPOINTS.languageById(id))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEYS.languages })
    },
  })
}
