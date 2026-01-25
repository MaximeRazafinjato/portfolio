import { useQuery } from '@tanstack/react-query'
import { api, API_ENDPOINTS } from '@/lib/api'
import { PROFILE_QUERY_KEYS } from './constants'
import type { PersonalInfo, SocialLink, Language } from './types'

export function usePersonalInfoQuery() {
  return useQuery({
    queryKey: PROFILE_QUERY_KEYS.personalInfo,
    queryFn: async () => {
      const response = await api.get<PersonalInfo | null>(API_ENDPOINTS.personalInfo)
      return response.data
    },
  })
}

export function useSocialLinksQuery() {
  return useQuery({
    queryKey: PROFILE_QUERY_KEYS.socialLinks,
    queryFn: async () => {
      const response = await api.get<SocialLink[]>(API_ENDPOINTS.socialLinks)
      return response.data
    },
  })
}

export function useLanguagesQuery() {
  return useQuery({
    queryKey: PROFILE_QUERY_KEYS.languages,
    queryFn: async () => {
      const response = await api.get<Language[]>(API_ENDPOINTS.languages)
      return response.data
    },
  })
}
