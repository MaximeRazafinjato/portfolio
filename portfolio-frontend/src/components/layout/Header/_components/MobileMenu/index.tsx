import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { navItems } from '@/constants/navigation'
import ThemeToggle from '../ThemeToggle'
import LanguageSwitch from '../LanguageSwitch'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

const menuVariants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.3,
      when: 'afterChildren',
    },
  },
  open: {
    opacity: 1,
    height: 'auto',
    transition: {
      duration: 0.3,
      when: 'beforeChildren',
      staggerChildren: 0.05,
    },
  },
}

const itemVariants = {
  closed: { opacity: 0, x: -20 },
  open: { opacity: 1, x: 0 },
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { t } = useTranslation()

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={menuVariants}
          initial="closed"
          animate="open"
          exit="closed"
          className="absolute left-0 right-0 top-full overflow-hidden border-b bg-background/95 backdrop-blur-md md:hidden"
        >
          <nav className="container flex flex-col gap-2 px-4 py-4">
            {navItems.map((item) => (
              <motion.a
                key={item.id}
                href={item.href}
                variants={itemVariants}
                onClick={onClose}
                className="rounded-md px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
              >
                {t(item.labelKey)}
              </motion.a>
            ))}
            <motion.div
              variants={itemVariants}
              className="mt-2 flex items-center justify-between border-t pt-4"
            >
              <ThemeToggle />
              <LanguageSwitch />
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
