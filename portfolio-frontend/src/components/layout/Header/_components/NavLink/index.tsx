import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

interface NavLinkProps {
  href: string
  labelKey: string
  onClick?: () => void
}

export default function NavLink({ href, labelKey, onClick }: NavLinkProps) {
  const { t } = useTranslation()

  return (
    <motion.a
      href={href}
      onClick={onClick}
      className="relative px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {t(labelKey)}
      <motion.span
        className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary"
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.2 }}
      />
    </motion.a>
  )
}
