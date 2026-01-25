import { z } from 'zod'

export const personalInfoSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  titleFr: z.string().min(1, 'Le titre (FR) est requis'),
  titleEn: z.string().min(1, 'Le titre (EN) est requis'),
  email: z.string().email('Email invalide'),
  phone: z.string().optional(),
  city: z.string().min(1, 'La ville est requise'),
  countryFr: z.string().min(1, 'Le pays (FR) est requis'),
  countryEn: z.string().min(1, 'Le pays (EN) est requis'),
  avatarUrl: z.string().url('URL invalide').optional().or(z.literal('')),
  cvUrl: z.string().url('URL invalide').optional().or(z.literal('')),
})

export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>

export interface PersonalInfo {
  id?: string
  name: string
  titleFr: string
  titleEn: string
  email: string
  phone?: string
  city: string
  countryFr: string
  countryEn: string
  avatarUrl?: string
  cvUrl?: string
}

export const socialLinkSchema = z.object({
  platform: z.string().min(1, 'La plateforme est requise'),
  url: z.string().url('URL invalide'),
  displayOrder: z.number().int().min(0),
})

export type SocialLinkFormData = z.infer<typeof socialLinkSchema>

export interface SocialLink {
  id?: string
  platform: string
  url: string
  displayOrder: number
}

export const LANGUAGE_LEVELS = ['Native', 'Fluent', 'Advanced', 'Intermediate', 'Basic'] as const
export type LanguageLevelType = (typeof LANGUAGE_LEVELS)[number]

export const languageSchema = z.object({
  nameFr: z.string().min(1, 'Le nom (FR) est requis'),
  nameEn: z.string().min(1, 'Le nom (EN) est requis'),
  level: z.enum(LANGUAGE_LEVELS),
  displayOrder: z.number().int().min(0),
})

export type LanguageFormData = z.infer<typeof languageSchema>

export interface Language {
  id?: string
  nameFr: string
  nameEn: string
  level: LanguageLevelType
  displayOrder: number
}
