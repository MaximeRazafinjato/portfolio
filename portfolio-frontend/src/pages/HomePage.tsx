import Hero from '@/components/features/Hero'
import About from '@/components/features/About'
import Experience from '@/components/features/Experience'
import Projects from '@/components/features/Projects'
import Skills from '@/components/features/Skills'
import Blog from '@/components/features/Blog'
import Contact from '@/components/features/Contact'
import SEO from '@/components/common/SEO'

export default function HomePage() {
  return (
    <div className="h-screen snap-y snap-mandatory overflow-y-auto">
      <SEO url="/" />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Blog />
      <Contact />
    </div>
  )
}
