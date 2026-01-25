import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { personalInfo as staticPersonalInfo, timeline as staticTimeline } from '@/constants/personal-info'
import { fadeInUp, staggerContainer } from '@/constants/animations'
import { useEducationQuery } from '@/domains/career'
import { useLanguagesQuery } from '@/domains/profile'
import { getYearFromDate } from '@/utils/formatters'
import TimelineItem from './_components/TimelineItem'
import LanguageCard from './_components/LanguageCard'

const LEVEL_MAP: Record<string, 'native' | 'fluent' | 'advanced' | 'intermediate' | 'basic'> = {
  Native: 'native',
  Fluent: 'fluent',
  Advanced: 'advanced',
  Intermediate: 'intermediate',
  Basic: 'basic',
}

export default function About() {
  const { t, i18n } = useTranslation()
  const locale = i18n.language as 'fr' | 'en'

  const { data: apiEducation } = useEducationQuery()
  const { data: apiLanguages } = useLanguagesQuery()

  const timelineItems = apiEducation?.length
    ? apiEducation.map((edu) => ({
        year: edu.periodEnd
          ? `${getYearFromDate(edu.periodStart)}-${getYearFromDate(edu.periodEnd)}`
          : `${getYearFromDate(edu.periodStart)}-now`,
        location: locale === 'fr' ? edu.locationFr : edu.locationEn,
        description: locale === 'fr' ? edu.descriptionFr : edu.descriptionEn,
        flag: edu.flagEmoji || '',
      }))
    : staticTimeline.map((item) => ({
        year: item.year,
        location: item.location[locale],
        description: item.description[locale],
        flag: item.flag,
      }))

  const languageItems = apiLanguages?.length
    ? apiLanguages.map((lang, index) => ({
        id: lang.id || `api-${index}`,
        name: locale === 'fr' ? lang.nameFr : lang.nameEn,
        level: LEVEL_MAP[lang.level] || 'intermediate',
      }))
    : staticPersonalInfo.languages.map((lang, index) => ({
        id: `static-${index}`,
        name: lang.name[locale],
        level: lang.level as 'native' | 'fluent' | 'intermediate' | 'basic',
      }))

  return (
    <section id="about" className="flex h-screen snap-start items-center bg-muted/30">
      <div className="container mx-auto px-4 py-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.h2
            variants={fadeInUp}
            className="mb-4 text-center text-3xl font-bold md:text-4xl"
          >
            {t('about.title')}
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground"
          >
            {t('about.description')}
          </motion.p>

          <div className="grid gap-12 lg:grid-cols-2">
            <motion.div variants={fadeInUp}>
              <h3 className="mb-6 text-xl font-semibold">
                {t('about.timeline.title')}
              </h3>
              <div>
                {timelineItems.map((item, index) => (
                  <TimelineItem
                    key={item.year}
                    year={item.year}
                    location={item.location}
                    description={item.description}
                    flag={item.flag}
                    isLast={index === timelineItems.length - 1}
                  />
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h3 className="mb-6 text-xl font-semibold">
                {t('about.languages.title')}
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {languageItems.map((lang) => (
                  <LanguageCard
                    key={lang.id}
                    name={lang.name}
                    level={lang.level}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
