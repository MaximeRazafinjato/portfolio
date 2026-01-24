import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'
import { personalInfo } from '@/constants/personal-info'
import { fadeInUp } from '@/constants/animations'

const CURRENT_YEAR = new Date().getFullYear()

const socialLinks = [
  {
    id: 'github',
    href: personalInfo.social.github,
    icon: Github,
    label: 'GitHub',
  },
  {
    id: 'linkedin',
    href: personalInfo.social.linkedin,
    icon: Linkedin,
    label: 'LinkedIn',
  },
  {
    id: 'email',
    href: `mailto:${personalInfo.email}`,
    icon: Mail,
    label: 'Email',
  },
]

export default function Footer() {
  const { t } = useTranslation()

  return (
    <motion.footer
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="border-t bg-background py-8"
    >
      <div className="container mx-auto flex flex-col items-center gap-4 px-4">
        <nav className="flex items-center gap-4" aria-label={t('accessibility.socialLinks')}>
          {socialLinks.map(({ id, href, icon: Icon, label }) => (
            <motion.a
              key={id}
              href={href}
              target={id !== 'email' ? '_blank' : undefined}
              rel={id !== 'email' ? 'noopener noreferrer' : undefined}
              aria-label={label}
              className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Icon className="h-5 w-5" />
            </motion.a>
          ))}
        </nav>

        <p className="text-center text-sm text-muted-foreground">
          &copy; {CURRENT_YEAR} {personalInfo.name}. {t('footer.rights')}
        </p>
      </div>
    </motion.footer>
  )
}
