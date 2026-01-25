import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api, API_ENDPOINTS } from '@/lib/api'
import { CAREER_QUERY_KEYS } from './constants'
import type { Experience, Education } from './types'

export function useCreateExperienceMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: Omit<Experience, 'id'>) => {
      const response = await api.post<{ id: string }>(API_ENDPOINTS.experiences, data)
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
      await api.put(API_ENDPOINTS.experienceById(id), data)
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
      const response = await api.post<{ id: string }>(API_ENDPOINTS.education, data)
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
      await api.put(API_ENDPOINTS.educationById(id), data)
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
