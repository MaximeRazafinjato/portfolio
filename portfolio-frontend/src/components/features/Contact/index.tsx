import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/constants/animations'
import ContactForm from './_components/ContactForm'
import SocialLinks from './_components/SocialLinks'

export default function Contact() {
  const { t } = useTranslation()

  return (
    <section id="contact" className="bg-muted/30 py-20">
      <div className="container mx-auto px-4">
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
            {t('contact.title')}
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground"
          >
            {t('contact.subtitle')}
          </motion.p>

          <div className="mx-auto grid max-w-4xl gap-12 lg:grid-cols-2">
            <motion.div variants={fadeInUp}>
              <ContactForm />
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col justify-center"
            >
              <SocialLinks />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
