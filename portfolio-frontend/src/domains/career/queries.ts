import { useQuery } from '@tanstack/react-query'
import { api, API_ENDPOINTS } from '@/lib/api'
import { CAREER_QUERY_KEYS } from './constants'
import type { Experience, Education } from './types'

export function useExperiencesQuery() {
  return useQuery({
    queryKey: CAREER_QUERY_KEYS.experiences,
    queryFn: async () => {
      const response = await api.get<Experience[]>(API_ENDPOINTS.experiences)
      return response.data
    },
  })
}

export function useEducationQuery() {
  return useQuery({
    queryKey: CAREER_QUERY_KEYS.education,
    queryFn: async () => {
      const response = await api.get<Education[]>(API_ENDPOINTS.education)
      return response.data
    },
  })
}
