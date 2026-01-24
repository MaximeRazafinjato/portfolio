import { motion } from 'framer-motion'
import { scaleIn } from '@/constants/animations'

interface SoftSkillBadgeProps {
  name: string
}

export default function SoftSkillBadge({ name }: SoftSkillBadgeProps) {
  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ scale: 1.05 }}
      className="rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
    >
      {name}
    </motion.div>
  )
}
