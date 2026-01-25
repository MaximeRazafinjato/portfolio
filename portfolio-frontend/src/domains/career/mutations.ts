import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api, API_ENDPOINTS } from '@/lib/api'
import { CAREER_QUERY_KEYS } from './constants'
import type { Experience, Education } from './types'

export function useCreateExperienceMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: Omit<Experience, 'id'>) => {
      const payload = {
        ...data,
        periodEnd: data.periodEnd || null,
      }
      const response = await api.post<{ id: string }>(API_ENDPOINTS.experiences, payload)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CAREER_QUERY_KEYS.experiences })
    },
  })
}

export function useUpdateExperienceMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, ...data }: Experience & { id: string }) => {
      const payload = {
        ...data,
        periodEnd: data.periodEnd || null,
      }
      await api.put(API_ENDPOINTS.experienceById(id), payload)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CAREER_QUERY_KEYS.experiences })
    },
  })
}

export function useDeleteExperienceMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(API_ENDPOINTS.experienceById(id))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CAREER_QUERY_KEYS.experiences })
    },
  })
}

export function useCreateEducationMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: Omit<Education, 'id'>) => {
      const payload = {
        ...data,
        periodEnd: data.periodEnd || null,
      }
      const response = await api.post<{ id: string }>(API_ENDPOINTS.education, payload)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CAREER_QUERY_KEYS.education })
    },
  })
}

export function useUpdateEducationMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, ...data }: Education & { id: string }) => {
      const payload = {
        ...data,
        periodEnd: data.periodEnd || null,
      }
      await api.put(API_ENDPOINTS.educationById(id), payload)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CAREER_QUERY_KEYS.education })
    },
  })
}

export function useDeleteEducationMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(API_ENDPOINTS.educationById(id))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CAREER_QUERY_KEYS.education })
    },
  })
}
