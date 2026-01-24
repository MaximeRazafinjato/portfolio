import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:7071/api'

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export function setAuthToken(token: string | null) {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete api.defaults.headers.common['Authorization']
  }
}

export const API_ENDPOINTS = {
  articles: '/articles',
  articleBySlug: (slug: string) => `/articles/${slug}`,
  articleById: (id: string) => `/articles/${id}`,
  articlePublish: (id: string) => `/articles/${id}/publish`,
  contact: '/contact',
} as const
