import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { experiences } from '@/constants/experiences'
import { fadeInUp, staggerContainer } from '@/constants/animations'
import ExperienceCard from './_components/ExperienceCard'

export default function Experience() {
  const { t } = useTranslation()

  return (
    <section id="experience" className="flex h-screen snap-start items-center">
      <div className="container mx-auto px-4 py-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.h2
            variants={fadeInUp}
            className="mb-12 text-center text-3xl font-bold md:text-4xl"
          >
            {t('experience.title')}
          </motion.h2>

          <div className="grid gap-6 lg:grid-cols-2">
            {experiences.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
