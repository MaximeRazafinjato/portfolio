import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'
import Header from '../Header'
import Footer from '../Footer'
import ScrollToTop from '@/components/common/ScrollToTop'
import SkipLink from '@/components/common/SkipLink'

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-background">
      <SkipLink />
      <ScrollToTop />
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <Toaster position="bottom-right" richColors />
    </div>
  )
}
