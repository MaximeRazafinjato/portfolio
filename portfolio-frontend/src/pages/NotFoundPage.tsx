import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Home, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import SEO from '@/components/common/SEO'
import { fadeInUp, staggerContainer } from '@/constants/animations'

export default function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <>
      <SEO
        title={t('seo.notFoundTitle')}
        description={t('seo.notFoundDescription')}
        noIndex
      />
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        </div>

        <motion.div
          className="text-center"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={fadeInUp}
            className="mb-8 text-[150px] font-bold leading-none text-primary/20 md:text-[200px]"
          >
            404
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="mb-4 text-3xl font-bold md:text-4xl"
          >
            {t('notFound.title')}
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mb-8 max-w-md text-muted-foreground"
          >
            {t('notFound.description')}
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button asChild size="lg">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                {t('notFound.backHome')}
              </Link>
            </Button>
            <Button variant="outline" size="lg" onClick={() => window.history.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('notFound.goBack')}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}
