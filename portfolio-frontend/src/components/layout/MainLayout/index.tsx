import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'
import Header from '../Header'
import Footer from '../Footer'

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Toaster position="bottom-right" richColors />
    </div>
  )
}
