import { useQuery } from '@tanstack/react-query'
import { api, API_ENDPOINTS } from '@/lib/api'
import { PORTFOLIO_QUERY_KEYS } from './constants'
import type { SkillCategory, Skill, SoftSkill, Project } from './types'

export function useSkillCategoriesQuery() {
  return useQuery({
    queryKey: PORTFOLIO_QUERY_KEYS.skillCategories,
    queryFn: async () => {
      const response = await api.get<SkillCategory[]>(API_ENDPOINTS.skillCategories)
      return response.data
    },
  })
}

export function useSkillCategoriesWithSkillsQuery() {
  return useQuery({
    queryKey: PORTFOLIO_QUERY_KEYS.skillCategoriesWithSkills,
    queryFn: async () => {
      const response = await api.get<SkillCategory[]>(`${API_ENDPOINTS.skillCategories}?includeSkills=true`)
      return response.data
    },
  })
}

export function useSkillsQuery() {
  return useQuery({
    queryKey: PORTFOLIO_QUERY_KEYS.skills,
    queryFn: async () => {
      const response = await api.get<Skill[]>(API_ENDPOINTS.skills)
      return response.data
    },
  })
}

export function useSoftSkillsQuery() {
  return useQuery({
    queryKey: PORTFOLIO_QUERY_KEYS.softSkills,
    queryFn: async () => {
      const response = await api.get<SoftSkill[]>(API_ENDPOINTS.softSkills)
      return response.data
    },
  })
}

export function useProjectsQuery() {
  return useQuery({
    queryKey: PORTFOLIO_QUERY_KEYS.projects,
    queryFn: async () => {
      const response = await api.get<Project[]>(API_ENDPOINTS.projects)
      return response.data
    },
  })
}
