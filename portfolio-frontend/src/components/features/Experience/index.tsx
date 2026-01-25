import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { experiences as staticExperiences, type Experience } from '@/constants/experiences'
import { fadeInUp, staggerContainer } from '@/constants/animations'
import { useExperiencesQuery } from '@/domains/career'
import { getYearFromDate } from '@/utils/formatters'
import ExperienceCard from './_components/ExperienceCard'

export default function Experience() {
  const { t } = useTranslation()
  const { data: apiExperiences } = useExperiencesQuery()

  const experienceItems: Experience[] = apiExperiences?.length
    ? apiExperiences.map((exp) => ({
        id: exp.id || '',
        company: exp.companyName,
        companyType: { fr: '', en: '' },
        location: { fr: exp.locationFr, en: exp.locationEn },
        title: { fr: exp.positionFr, en: exp.positionEn },
        period: {
          start: getYearFromDate(exp.periodStart),
          end: exp.isCurrent ? null : (exp.periodEnd ? getYearFromDate(exp.periodEnd) : null),
        },
        responsibilities: { fr: exp.responsibilitiesFr, en: exp.responsibilitiesEn },
        technologies: exp.technologies,
      }))
    : staticExperiences

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
            {experienceItems.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
