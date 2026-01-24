import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { scaleIn } from '@/constants/animations'

interface LanguageCardProps {
  name: string
  level: 'native' | 'fluent' | 'intermediate' | 'basic'
}

const levelColors = {
  native: 'bg-primary text-primary-foreground',
  fluent: 'bg-primary/80 text-primary-foreground',
  intermediate: 'bg-primary/60 text-primary-foreground',
  basic: 'bg-primary/40 text-primary-foreground',
}

export default function LanguageCard({ name, level }: LanguageCardProps) {
  const { t } = useTranslation()

  return (
    <motion.div
      variants={scaleIn}
      className="flex items-center justify-between rounded-lg border bg-card p-3"
    >
      <span className="font-medium">{name}</span>
      <span className={`rounded-full px-3 py-1 text-xs font-medium ${levelColors[level]}`}>
        {t(`about.languages.${level}`)}
      </span>
    </motion.div>
  )
}
