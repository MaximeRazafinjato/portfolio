import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'
import type { Project } from '@/constants/projects'
import { scaleIn } from '@/constants/animations'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { t, i18n } = useTranslation()
  const locale = i18n.language as 'fr' | 'en'

  return (
    <motion.article
      variants={scaleIn}
      whileHover={{ y: -8 }}
      className="group relative flex flex-col overflow-hidden rounded-xl border bg-card transition-all hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 text-xl font-bold group-hover:text-primary">
          {project.name}
        </h3>

        <p className="mb-4 text-sm text-muted-foreground">
          {project.description[locale]}
        </p>

        <ul className="mb-4 flex-1 space-y-1">
          {project.features[locale].map((feature, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-sm text-muted-foreground"
            >
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/60" />
              {feature}
            </li>
          ))}
        </ul>

        <div className="mb-4 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 gap-2"
            asChild
          >
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4" />
              {t('projects.viewCode')}
            </a>
          </Button>
          {project.demoUrl && (
            <Button
              size="sm"
              className="flex-1 gap-2"
              asChild
            >
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4" />
                {t('projects.viewDemo')}
              </a>
            </Button>
          )}
        </div>
      </div>
    </motion.article>
  )
}
