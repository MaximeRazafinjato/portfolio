import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { projects as staticProjects, type Project } from '@/constants/projects'
import { fadeInUp, staggerContainer } from '@/constants/animations'
import { useProjectsQuery } from '@/domains/portfolio'
import ProjectCard from './_components/ProjectCard'

export default function Projects() {
  const { t } = useTranslation()
  const { data: apiProjects } = useProjectsQuery()

  const projectItems: Project[] = apiProjects?.length
    ? apiProjects.map((proj) => ({
        id: proj.id || '',
        name: proj.name,
        description: { fr: proj.descriptionFr, en: proj.descriptionEn },
        technologies: proj.technologies,
        githubUrl: proj.githubUrl || '',
        demoUrl: proj.demoUrl,
        imageUrl: proj.imageUrl,
        features: { fr: proj.featuresFr, en: proj.featuresEn },
      }))
    : staticProjects

  return (
    <section id="projects" className="flex h-screen snap-start items-center bg-muted/30">
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
            {t('projects.title')}
          </motion.h2>

          <div className="grid gap-6 md:grid-cols-2">
            {projectItems.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
