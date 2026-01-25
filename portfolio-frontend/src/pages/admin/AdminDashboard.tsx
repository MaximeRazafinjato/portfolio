import { Link } from 'react-router-dom'
import {
  User,
  Link as LinkIcon,
  Languages,
  Briefcase,
  GraduationCap,
  FolderOpen,
  Code,
  Heart,
  Rocket,
  FileText,
  ChevronRight,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { usePersonalInfoQuery, useSocialLinksQuery, useLanguagesQuery } from '@/domains/profile'
import { useExperiencesQuery, useEducationQuery } from '@/domains/career'
import {
  useSkillCategoriesQuery,
  useSkillsQuery,
  useSoftSkillsQuery,
  useProjectsQuery,
} from '@/domains/portfolio'
import { useArticlesQuery } from '@/domains/blog'

const SECTIONS = [
  { to: '/admin/personal-info', label: 'Infos personnelles', icon: User, useQuery: usePersonalInfoQuery, isSingleton: true },
  { to: '/admin/social-links', label: 'Réseaux sociaux', icon: LinkIcon, useQuery: useSocialLinksQuery },
  { to: '/admin/languages', label: 'Langues', icon: Languages, useQuery: useLanguagesQuery },
  { to: '/admin/experiences', label: 'Expériences', icon: Briefcase, useQuery: useExperiencesQuery },
  { to: '/admin/education', label: 'Parcours', icon: GraduationCap, useQuery: useEducationQuery },
  { to: '/admin/skill-categories', label: 'Catégories compétences', icon: FolderOpen, useQuery: useSkillCategoriesQuery },
  { to: '/admin/skills', label: 'Compétences', icon: Code, useQuery: useSkillsQuery },
  { to: '/admin/soft-skills', label: 'Soft skills', icon: Heart, useQuery: useSoftSkillsQuery },
  { to: '/admin/projects', label: 'Projets', icon: Rocket, useQuery: useProjectsQuery },
  { to: '/admin/blog', label: 'Blog', icon: FileText, useQuery: useArticlesQuery },
]

function DashboardCard({
  to,
  label,
  icon: Icon,
  count,
  isSingleton,
}: {
  to: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  count?: number
  isSingleton?: boolean
}) {
  return (
    <Link to={to}>
      <Card className="transition-colors hover:bg-muted/50">
        <CardContent className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium">{label}</p>
              <p className="text-sm text-muted-foreground">
                {isSingleton ? (count ? 'Configuré' : 'Non configuré') : `${count ?? 0} élément${(count ?? 0) > 1 ? 's' : ''}`}
              </p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </CardContent>
      </Card>
    </Link>
  )
}

export default function AdminDashboard() {
  const personalInfo = usePersonalInfoQuery()
  const socialLinks = useSocialLinksQuery()
  const languages = useLanguagesQuery()
  const experiences = useExperiencesQuery()
  const education = useEducationQuery()
  const skillCategories = useSkillCategoriesQuery()
  const skills = useSkillsQuery()
  const softSkills = useSoftSkillsQuery()
  const projects = useProjectsQuery()
  const articles = useArticlesQuery()

  const getCounts = () => ({
    '/admin/personal-info': personalInfo.data ? 1 : 0,
    '/admin/social-links': socialLinks.data?.length ?? 0,
    '/admin/languages': languages.data?.length ?? 0,
    '/admin/experiences': experiences.data?.length ?? 0,
    '/admin/education': education.data?.length ?? 0,
    '/admin/skill-categories': skillCategories.data?.length ?? 0,
    '/admin/skills': skills.data?.length ?? 0,
    '/admin/soft-skills': softSkills.data?.length ?? 0,
    '/admin/projects': projects.data?.length ?? 0,
    '/admin/blog': articles.data?.items?.length ?? 0,
  })

  const counts = getCounts()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className="text-muted-foreground">Gérez le contenu de votre portfolio</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sections</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          {SECTIONS.map((section) => (
            <DashboardCard
              key={section.to}
              to={section.to}
              label={section.label}
              icon={section.icon}
              count={counts[section.to as keyof typeof counts]}
              isSingleton={section.isSingleton}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
