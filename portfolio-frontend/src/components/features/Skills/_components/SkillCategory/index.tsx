import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { skillIcons } from '@/constants/skill-icons'
import { fadeInUp, staggerContainer } from '@/constants/animations'
import { Badge } from '@/components/ui/badge'

interface SkillDisplay {
  name: string
  iconKey?: string
}

export interface SkillCategoryDisplay {
  id: string
  nameKey: string
  skills: SkillDisplay[]
}

interface SkillCategoryProps {
  category: SkillCategoryDisplay
}

export default function SkillCategory({ category }: SkillCategoryProps) {
  const { t } = useTranslation()

  const displayName = category.nameKey.startsWith('skills.')
    ? t(category.nameKey)
    : category.nameKey

  return (
    <motion.div variants={fadeInUp} className="rounded-xl border bg-card p-4">
      <h3 className="mb-3 font-semibold text-primary">
        {displayName}
      </h3>
      <motion.div
        variants={staggerContainer}
        className="flex flex-wrap gap-2"
      >
        {category.skills.map((skill) => {
          const Icon = skillIcons[skill.iconKey || ''] || skillIcons[skill.name]
          return (
            <motion.div key={skill.name} variants={fadeInUp}>
              <Badge variant="secondary" className="gap-1.5">
                {Icon && <Icon className="h-3.5 w-3.5" />}
                {skill.name}
              </Badge>
            </motion.div>
          )
        })}
      </motion.div>
    </motion.div>
  )
}
