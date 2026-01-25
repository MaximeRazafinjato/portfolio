import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowDown, Mail, FolderGit2, Download } from 'lucide-react'
import { personalInfo as staticPersonalInfo } from '@/constants/personal-info'
import { fadeInUp, staggerContainer, scaleIn } from '@/constants/animations'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { usePersonalInfoQuery } from '@/domains/profile'
import AnimatedName from './_components/AnimatedName'

const SCROLL_DELAY_MS = 500
const DEFAULT_CV_PATH = '/cv.pdf'
const DEFAULT_AVATAR_PATH = '/avatar.jpg'

export default function Hero() {
  const { t, i18n } = useTranslation()
  const locale = i18n.language as 'fr' | 'en'
  const { data: apiPersonalInfo } = usePersonalInfoQuery()

  const name = apiPersonalInfo?.name ?? staticPersonalInfo.name
  const title = locale === 'fr'
    ? (apiPersonalInfo?.titleFr ?? staticPersonalInfo.title.fr)
    : (apiPersonalInfo?.titleEn ?? staticPersonalInfo.title.en)
  const avatarUrl = apiPersonalInfo?.avatarUrl || DEFAULT_AVATAR_PATH
  const cvUrl = apiPersonalInfo?.cvUrl || DEFAULT_CV_PATH

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
      className="relative flex h-screen snap-start items-center justify-center overflow-hidden"
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
        <motion.div variants={scaleIn} className="mb-6 flex justify-center">
          <Avatar className="h-32 w-32 border-4 border-primary/20 shadow-xl shadow-primary/10">
            <AvatarImage src={avatarUrl} alt={name} />
            <AvatarFallback className="bg-gradient-to-br from-primary to-primary/60 text-3xl font-bold text-primary-foreground">
              MR
            </AvatarFallback>
          </Avatar>
        </motion.div>

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
          <AnimatedName text={name} delay={300} />
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="mb-8 text-xl text-primary/80 sm:text-2xl"
        >
          {title}
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
          <Button
            variant="secondary"
            size="lg"
            className="gap-2"
            asChild
          >
            <a href={cvUrl} download>
              <Download className="h-4 w-4" />
              {t('hero.cta.downloadCv')}
            </a>
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
