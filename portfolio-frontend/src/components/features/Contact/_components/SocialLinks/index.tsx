import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Phone, MapPin, Globe } from 'lucide-react'
import { personalInfo as staticPersonalInfo } from '@/constants/personal-info'
import { fadeInUp, staggerContainer } from '@/constants/animations'
import { usePersonalInfoQuery, useSocialLinksQuery } from '@/domains/profile'

const PLATFORM_ICONS: Record<string, typeof Github> = {
  github: Github,
  linkedin: Linkedin,
}

export default function SocialLinks() {
  const { i18n } = useTranslation()
  const locale = i18n.language as 'fr' | 'en'

  const { data: apiPersonalInfo } = usePersonalInfoQuery()
  const { data: apiSocialLinks } = useSocialLinksQuery()

  const email = apiPersonalInfo?.email ?? staticPersonalInfo.email
  const phone = apiPersonalInfo?.phone ?? staticPersonalInfo.phone
  const city = apiPersonalInfo?.city ?? staticPersonalInfo.location.city
  const country = locale === 'fr'
    ? (apiPersonalInfo?.countryFr ?? staticPersonalInfo.location.country.fr)
    : (apiPersonalInfo?.countryEn ?? staticPersonalInfo.location.country.en)

  const contactInfo = useMemo(() => [
    {
      id: 'email',
      icon: Mail,
      label: email,
      href: `mailto:${email}`,
    },
    {
      id: 'phone',
      icon: Phone,
      label: phone,
      href: `tel:${phone.replace(/\s/g, '')}`,
    },
    {
      id: 'location',
      icon: MapPin,
      label: `${city}, ${country}`,
      href: null,
    },
  ], [email, phone, city, country])

  const socialLinkItems = useMemo(() => {
    if (apiSocialLinks?.length) {
      return apiSocialLinks.map((link) => ({
        id: link.id || link.platform,
        icon: PLATFORM_ICONS[link.platform.toLowerCase()] || Globe,
        label: link.platform,
        href: link.url,
      }))
    }
    return [
      {
        id: 'github',
        icon: Github,
        label: 'GitHub',
        href: staticPersonalInfo.social.github,
      },
      {
        id: 'linkedin',
        icon: Linkedin,
        label: 'LinkedIn',
        href: staticPersonalInfo.social.linkedin,
      },
    ]
  }, [apiSocialLinks])

  return (
    <motion.div
      variants={staggerContainer}
      className="space-y-6"
    >
      <motion.div variants={fadeInUp} className="space-y-4">
        {contactInfo.map(({ id, icon: Icon, label, href }) => (
          <div key={id} className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Icon className="h-5 w-5" />
            </div>
            {href ? (
              <a
                href={href}
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                {label}
              </a>
            ) : (
              <span className="text-muted-foreground">{label}</span>
            )}
          </div>
        ))}
      </motion.div>

      <motion.div variants={fadeInUp} className="flex gap-4">
        {socialLinkItems.map(({ id, icon: Icon, label, href }) => (
          <motion.a
            key={id}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="flex h-12 w-12 items-center justify-center rounded-full border bg-card text-muted-foreground transition-all hover:border-primary hover:bg-primary/10 hover:text-primary"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Icon className="h-5 w-5" />
          </motion.a>
        ))}
      </motion.div>
    </motion.div>
  )
}
