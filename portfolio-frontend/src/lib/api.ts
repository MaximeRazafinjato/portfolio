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

  personalInfo: '/personal-info',

  socialLinks: '/social-links',
  socialLinkById: (id: string) => `/social-links/${id}`,

  languages: '/languages',
  languageById: (id: string) => `/languages/${id}`,

  experiences: '/experiences',
  experienceById: (id: string) => `/experiences/${id}`,

  education: '/education',
  educationById: (id: string) => `/education/${id}`,

  skillCategories: '/skill-categories',
  skillCategoryById: (id: string) => `/skill-categories/${id}`,

  skills: '/skills',
  skillById: (id: string) => `/skills/${id}`,

  softSkills: '/soft-skills',
  softSkillById: (id: string) => `/soft-skills/${id}`,

  projects: '/projects',
  projectById: (id: string) => `/projects/${id}`,

  uploadFile: '/files/upload',
  deleteFile: (blobName: string) => `/files/${blobName}`,
} as const
