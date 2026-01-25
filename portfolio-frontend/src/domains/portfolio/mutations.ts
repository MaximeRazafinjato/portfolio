import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api, API_ENDPOINTS } from '@/lib/api'
import { PORTFOLIO_QUERY_KEYS } from './constants'
import type { SkillCategory, Skill, SoftSkill, Project } from './types'

export function useCreateSkillCategoryMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: Omit<SkillCategory, 'id' | 'skills'>) => {
      const response = await api.post<{ id: string }>(API_ENDPOINTS.skillCategories, data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PORTFOLIO_QUERY_KEYS.skillCategories })
      queryClient.invalidateQueries({ queryKey: PORTFOLIO_QUERY_KEYS.skillCategoriesWithSkills })
    },
  })
}

export function useUpdateSkillCategoryMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, ...data }: SkillCategory & { id: string }) => {
      await api.put(API_ENDPOINTS.skillCategoryById(id), data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PORTFOLIO_QUERY_KEYS.skillCategories })
      queryClient.invalidateQueries({ queryKey: PORTFOLIO_QUERY_KEYS.skillCategoriesWithSkills })
    },
  })
}

export function useDeleteSkillCategoryMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(API_ENDPOINTS.skillCategoryById(id))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PORTFOLIO_QUERY_KEYS.skillCategories })
      queryClient.invalidateQueries({ queryKey: PORTFOLIO_QUERY_KEYS.skillCategoriesWithSkills })
      queryClient.invalidateQueries({ queryKey: PORTFOLIO_QUERY_KEYS.skills })
    },
  })
}

export function useCreateSkillMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: Omit<Skill, 'id'>) => {
      const response = await api.post<{ id: string }>(API_ENDPOINTS.skills, data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PORTFOLIO_QUERY_KEYS.skills })
      queryClient.invalidateQueries({ queryKey: PORTFOLIO_QUERY_KEYS.skillCategoriesWithSkills })
    },
  })
}

export function useUpdateSkillMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, ...data }: Skill & { id: string }) => {
      await api.put(API_ENDPOINTS.skillById(id), data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PORTFOLIO_QUERY_KEYS.skills })
      queryClient.invalidateQueries({ queryKey: PORTFOLIO_QUERY_KEYS.skillCategoriesWithSkills })
    },
  })
}

export function useDeleteSkillMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(API_ENDPOINTS.skillById(id))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PORTFOLIO_QUERY_KEYS.skills })
      queryClient.invalidateQueries({ queryKey: PORTFOLIO_QUERY_KEYS.skillCategoriesWithSkills })
    },
  })
}

export function useCreateSoftSkillMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: Omit<SoftSkill, 'id'>) => {
      const response = await api.post<{ id: string }>(API_ENDPOINTS.softSkills, data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PORTFOLIO_QUERY_KEYS.softSkills })
    },
  })
}

export function useUpdateSoftSkillMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, ...data }: SoftSkill & { id: string }) => {
      await api.put(API_ENDPOINTS.softSkillById(id), data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PORTFOLIO_QUERY_KEYS.softSkills })
    },
  })
}

export function useDeleteSoftSkillMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(API_ENDPOINTS.softSkillById(id))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PORTFOLIO_QUERY_KEYS.softSkills })
    },
  })
}

export function useCreateProjectMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: Omit<Project, 'id'>) => {
      const response = await api.post<{ id: string }>(API_ENDPOINTS.projects, data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PORTFOLIO_QUERY_KEYS.projects })
    },
  })
}

export function useUpdateProjectMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, ...data }: Project & { id: string }) => {
      await api.put(API_ENDPOINTS.projectById(id), data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PORTFOLIO_QUERY_KEYS.projects })
    },
  })
}

export function useDeleteProjectMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(API_ENDPOINTS.projectById(id))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PORTFOLIO_QUERY_KEYS.projects })
    },
  })
}
