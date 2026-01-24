import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { technicalSkills, softSkills } from '@/constants/skills'
import { fadeInUp, staggerContainer } from '@/constants/animations'
import SkillCategory from './_components/SkillCategory'
import SoftSkillBadge from './_components/SoftSkillBadge'

export default function Skills() {
  const { t, i18n } = useTranslation()
  const locale = i18n.language as 'fr' | 'en'

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
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
            {t('skills.title')}
          </motion.h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {technicalSkills.map((category) => (
              <SkillCategory key={category.id} category={category} />
            ))}
          </div>

          <motion.div variants={fadeInUp} className="mt-12">
            <h3 className="mb-6 text-center text-xl font-semibold">
              {t('skills.categories.softSkills')}
            </h3>
            <motion.div
              variants={staggerContainer}
              className="flex flex-wrap justify-center gap-3"
            >
              {softSkills.map((skill) => (
                <SoftSkillBadge key={skill.name.en} name={skill.name[locale]} />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
