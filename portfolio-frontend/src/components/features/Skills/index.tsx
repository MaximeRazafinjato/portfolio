import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import {
  technicalSkills as staticTechnicalSkills,
  softSkills as staticSoftSkills,
  type SkillCategory as SkillCategoryType,
} from '@/constants/skills'
import { fadeInUp, staggerContainer } from '@/constants/animations'
import { useSkillCategoriesWithSkillsQuery, useSoftSkillsQuery } from '@/domains/portfolio'
import SkillCategory from './_components/SkillCategory'
import SoftSkillBadge from './_components/SoftSkillBadge'

export default function Skills() {
  const { t, i18n } = useTranslation()
  const locale = i18n.language as 'fr' | 'en'

  const { data: apiCategories } = useSkillCategoriesWithSkillsQuery()
  const { data: apiSoftSkills } = useSoftSkillsQuery()

  const categoryItems: SkillCategoryType[] = apiCategories?.length
    ? apiCategories.map((cat) => ({
        id: cat.id || '',
        nameKey: locale === 'fr' ? cat.nameFr : cat.nameEn,
        skills: cat.skills?.map((s) => s.name) || [],
      }))
    : staticTechnicalSkills

  const softSkillItems = apiSoftSkills?.length
    ? apiSoftSkills.map((skill) => ({
        name: locale === 'fr' ? skill.nameFr : skill.nameEn,
      }))
    : staticSoftSkills.map((skill) => ({ name: skill.name[locale] }))

  return (
    <section id="skills" className="flex h-screen snap-start items-center">
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
            {t('skills.title')}
          </motion.h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categoryItems.map((category) => (
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
              {softSkillItems.map((skill) => (
                <SoftSkillBadge key={skill.name} name={skill.name} />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
