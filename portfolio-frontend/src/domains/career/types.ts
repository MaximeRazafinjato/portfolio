import { z } from 'zod'

export const experienceSchema = z.object({
  companyName: z.string().min(1, "Le nom de l'entreprise est requis"),
  positionFr: z.string().min(1, 'Le poste (FR) est requis'),
  positionEn: z.string().min(1, 'Le poste (EN) est requis'),
  periodStart: z.string().min(1, 'La date de début est requise'),
  periodEnd: z.string().optional(),
  isCurrent: z.boolean(),
  locationFr: z.string().min(1, 'La localisation (FR) est requise'),
  locationEn: z.string().min(1, 'La localisation (EN) est requise'),
  technologies: z.array(z.string()),
  responsibilitiesFr: z.array(z.string()),
  responsibilitiesEn: z.array(z.string()),
  displayOrder: z.number().int().min(0),
})

export type ExperienceFormData = z.infer<typeof experienceSchema>

export interface Experience {
  id?: string
  companyName: string
  positionFr: string
  positionEn: string
  periodStart: string
  periodEnd?: string
  isCurrent: boolean
  locationFr: string
  locationEn: string
  technologies: string[]
  responsibilitiesFr: string[]
  responsibilitiesEn: string[]
  displayOrder: number
}

export const educationSchema = z.object({
  periodStart: z.string().min(1, 'La date de début est requise'),
  periodEnd: z.string().optional(),
  locationFr: z.string().min(1, 'La localisation (FR) est requise'),
  locationEn: z.string().min(1, 'La localisation (EN) est requise'),
  descriptionFr: z.string().min(1, 'La description (FR) est requise'),
  descriptionEn: z.string().min(1, 'La description (EN) est requise'),
  flagEmoji: z.string().optional(),
  displayOrder: z.number().int().min(0),
})

export type EducationFormData = z.infer<typeof educationSchema>

export interface Education {
  id?: string
  periodStart: string
  periodEnd?: string
  locationFr: string
  locationEn: string
  descriptionFr: string
  descriptionEn: string
  flagEmoji?: string
  displayOrder: number
}
