import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Phone, MapPin } from 'lucide-react'
import { personalInfo } from '@/constants/personal-info'
import { fadeInUp, staggerContainer } from '@/constants/animations'

const contactInfo = [
  {
    id: 'email',
    icon: Mail,
    label: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
  },
  {
    id: 'phone',
    icon: Phone,
    label: personalInfo.phone,
    href: `tel:${personalInfo.phone.replace(/\s/g, '')}`,
  },
  {
    id: 'location',
    icon: MapPin,
    label: `${personalInfo.location.city}, France`,
    href: null,
  },
]

const socialLinks = [
  {
    id: 'github',
    icon: Github,
    label: 'GitHub',
    href: personalInfo.social.github,
  },
  {
    id: 'linkedin',
    icon: Linkedin,
    label: 'LinkedIn',
    href: personalInfo.social.linkedin,
  },
]

export default function SocialLinks() {
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
        {socialLinks.map(({ id, icon: Icon, label, href }) => (
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
