import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import type { SkillCategory as SkillCategoryType } from '@/constants/skills'
import { fadeInUp, staggerContainer } from '@/constants/animations'
import { Badge } from '@/components/ui/badge'

interface SkillCategoryProps {
  category: SkillCategoryType
}

export default function SkillCategory({ category }: SkillCategoryProps) {
  const { t } = useTranslation()

  return (
    <motion.div variants={fadeInUp} className="rounded-xl border bg-card p-4">
      <h3 className="mb-3 font-semibold text-primary">
        {t(category.nameKey)}
      </h3>
      <motion.div
        variants={staggerContainer}
        className="flex flex-wrap gap-2"
      >
        {category.skills.map((skill) => (
          <motion.div key={skill} variants={fadeInUp}>
            <Badge variant="secondary">{skill}</Badge>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
