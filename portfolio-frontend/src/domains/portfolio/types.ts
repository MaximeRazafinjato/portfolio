import { z } from 'zod'

export const skillCategorySchema = z.object({
  nameFr: z.string().min(1, 'Le nom (FR) est requis'),
  nameEn: z.string().min(1, 'Le nom (EN) est requis'),
  displayOrder: z.number().int().min(0),
})

export type SkillCategoryFormData = z.infer<typeof skillCategorySchema>

export interface SkillCategory {
  id?: string
  nameFr: string
  nameEn: string
  displayOrder: number
  skills?: Skill[]
}

export const skillSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  categoryId: z.string().min(1, 'La catégorie est requise'),
  iconKey: z.string().optional(),
  displayOrder: z.number().int().min(0),
})

export type SkillFormData = z.infer<typeof skillSchema>

export interface Skill {
  id?: string
  name: string
  categoryId: string
  iconKey?: string
  displayOrder: number
}

export const softSkillSchema = z.object({
  nameFr: z.string().min(1, 'Le nom (FR) est requis'),
  nameEn: z.string().min(1, 'Le nom (EN) est requis'),
  displayOrder: z.number().int().min(0),
})

export type SoftSkillFormData = z.infer<typeof softSkillSchema>

export interface SoftSkill {
  id?: string
  nameFr: string
  nameEn: string
  displayOrder: number
}

export const projectSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  descriptionFr: z.string().min(1, 'La description (FR) est requise'),
  descriptionEn: z.string().min(1, 'La description (EN) est requise'),
  technologies: z.array(z.string()),
  githubUrl: z.string().url('URL GitHub invalide').optional().or(z.literal('')),
  demoUrl: z.string().url('URL démo invalide').optional().or(z.literal('')),
  imageUrl: z.string().optional(),
  featuresFr: z.array(z.string()),
  featuresEn: z.array(z.string()),
  displayOrder: z.number().int().min(0),
})

export type ProjectFormData = z.infer<typeof projectSchema>

export interface Project {
  id?: string
  name: string
  descriptionFr: string
  descriptionEn: string
  technologies: string[]
  githubUrl?: string
  demoUrl?: string
  imageUrl?: string
  featuresFr: string[]
  featuresEn: string[]
  displayOrder: number
}
