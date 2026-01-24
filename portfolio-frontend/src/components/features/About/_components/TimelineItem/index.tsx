import { motion } from 'framer-motion'
import { fadeInLeft } from '@/constants/animations'

interface TimelineItemProps {
  year: string
  location: string
  description: string
  flag: string
  isLast?: boolean
}

export default function TimelineItem({
  year,
  location,
  description,
  flag,
  isLast = false,
}: TimelineItemProps) {
  return (
    <motion.div
      variants={fadeInLeft}
      className="relative flex gap-4 pb-8"
    >
      <div className="flex flex-col items-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-background text-xl">
          {flag}
        </div>
        {!isLast && (
          <div className="h-full w-0.5 bg-gradient-to-b from-primary to-primary/20" />
        )}
      </div>

      <div className="flex-1 pb-4">
        <p className="text-sm font-medium text-primary">{year}</p>
        <h4 className="font-semibold">{location}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  )
}
