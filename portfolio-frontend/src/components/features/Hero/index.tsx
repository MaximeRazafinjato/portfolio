import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowDown, Mail, FolderGit2 } from 'lucide-react'
import { personalInfo } from '@/constants/personal-info'
import { fadeInUp, staggerContainer, scaleIn } from '@/constants/animations'
import { Button } from '@/components/ui/button'
import TypewriterText from './_components/TypewriterText'

const SCROLL_DELAY_MS = 500

export default function Hero() {
  const { t, i18n } = useTranslation()
  const locale = i18n.language as 'fr' | 'en'

  const scrollToSection = (sectionId: string) => {
    setTimeout(() => {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }, SCROLL_DELAY_MS)
  }

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 text-center"
      >
        <motion.p
          variants={fadeInUp}
          className="mb-4 text-lg text-muted-foreground"
        >
          {t('hero.greeting')}
        </motion.p>

        <motion.h1
          variants={fadeInUp}
          className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          <TypewriterText
            text={personalInfo.name}
            className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent"
            delay={300}
          />
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="mb-8 text-xl text-primary/80 sm:text-2xl"
        >
          {personalInfo.title[locale]}
        </motion.p>

        <motion.p
          variants={fadeInUp}
          className="mx-auto mb-12 max-w-2xl text-lg text-muted-foreground"
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.div
          variants={fadeInUp}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button
            size="lg"
            className="gap-2"
            onClick={() => scrollToSection('contact')}
          >
            <Mail className="h-4 w-4" />
            {t('hero.cta.contact')}
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="gap-2"
            onClick={() => scrollToSection('projects')}
          >
            <FolderGit2 className="h-4 w-4" />
            {t('hero.cta.projects')}
          </Button>
        </motion.div>

        <motion.div
          variants={scaleIn}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.button
            onClick={() => scrollToSection('about')}
            className="rounded-full p-2 text-muted-foreground transition-colors hover:text-primary"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            aria-label="Défiler vers le bas"
          >
            <ArrowDown className="h-6 w-6" />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  )
}
