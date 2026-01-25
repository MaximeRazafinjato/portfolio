import { Outlet, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Toaster } from 'sonner'
import Header from '../Header'
import Footer from '../Footer'
import ScrollToTop from '@/components/common/ScrollToTop'
import SkipLink from '@/components/common/SkipLink'

export default function MainLayout() {
  const location = useLocation()
  const { i18n } = useTranslation()
  const isHomePage = location.pathname === '/'

  return (
    <div className="min-h-screen bg-background">
      <SkipLink />
      <ScrollToTop />
      <Header />
      <AnimatePresence mode="wait">
        <motion.main
          key={i18n.language}
          id="main-content"
          tabIndex={-1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      {!isHomePage && <Footer />}
      <Toaster position="bottom-right" richColors />
    </div>
  )
}
