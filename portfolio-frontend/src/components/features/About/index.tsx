import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { personalInfo, timeline } from '@/constants/personal-info'
import { fadeInUp, staggerContainer } from '@/constants/animations'
import TimelineItem from './_components/TimelineItem'
import LanguageCard from './_components/LanguageCard'

export default function About() {
  const { t, i18n } = useTranslation()
  const locale = i18n.language as 'fr' | 'en'

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
                {timeline.map((item, index) => (
                  <TimelineItem
                    key={item.year}
                    year={item.year}
                    location={item.location[locale]}
                    description={item.description[locale]}
                    flag={item.flag}
                    isLast={index === timeline.length - 1}
                  />
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h3 className="mb-6 text-xl font-semibold">
                {t('about.languages.title')}
              </h3>
              <motion.div
                variants={staggerContainer}
                className="grid gap-3 sm:grid-cols-2"
              >
                {personalInfo.languages.map((lang) => (
                  <LanguageCard
                    key={lang.name.en}
                    name={lang.name[locale]}
                    level={lang.level as 'native' | 'fluent' | 'intermediate' | 'basic'}
                  />
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
