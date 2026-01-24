import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { MapPin, Building2, Calendar } from 'lucide-react'
import type { Experience } from '@/constants/experiences'
import { fadeInUp } from '@/constants/animations'
import { Badge } from '@/components/ui/badge'

interface ExperienceCardProps {
  experience: Experience
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  const { t, i18n } = useTranslation()
  const locale = i18n.language as 'fr' | 'en'

  const periodDisplay = experience.period.end
    ? `${experience.period.start} - ${experience.period.end}`
    : `${experience.period.start} - ${t('experience.present')}`

  return (
    <motion.article
      variants={fadeInUp}
      className="group relative overflow-hidden rounded-xl border bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-card/80 hover:shadow-lg hover:shadow-primary/5"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="text-xl font-bold">{experience.title[locale]}</h3>
          <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Building2 className="h-4 w-4" />
              {experience.company} - {experience.companyType[locale]}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {experience.location[locale]}
            </span>
          </div>
        </div>
        <Badge variant="secondary" className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          {periodDisplay}
        </Badge>
      </div>

      <ul className="mb-4 space-y-2">
        {experience.responsibilities[locale].map((responsibility, index) => (
          <li
            key={index}
            className="flex items-start gap-2 text-sm text-muted-foreground"
          >
            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
            {responsibility}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-2">
        {experience.technologies.map((tech) => (
          <Badge key={tech} variant="outline" className="text-xs">
            {tech}
          </Badge>
        ))}
      </div>
    </motion.article>
  )
}
