import { Outlet, Link, NavLink } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import {
  User,
  Link as LinkIcon,
  Languages,
  Briefcase,
  GraduationCap,
  FolderOpen,
  Code,
  Heart,
  Rocket,
  FileText,
  LayoutDashboard,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuthToken } from '@/hooks/useAuthToken'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { to: '/admin/personal-info', label: 'Infos personnelles', icon: User },
  { to: '/admin/social-links', label: 'Réseaux sociaux', icon: LinkIcon },
  { to: '/admin/languages', label: 'Langues', icon: Languages },
  { to: '/admin/experiences', label: 'Expériences', icon: Briefcase },
  { to: '/admin/education', label: 'Parcours', icon: GraduationCap },
  { to: '/admin/skill-categories', label: 'Catégories compétences', icon: FolderOpen },
  { to: '/admin/skills', label: 'Compétences', icon: Code },
  { to: '/admin/soft-skills', label: 'Soft skills', icon: Heart },
  { to: '/admin/projects', label: 'Projets', icon: Rocket },
  { to: '/admin/blog', label: 'Blog', icon: FileText },
]

export default function AdminLayout() {
  const { isAuthenticated, isLoading, loginWithRedirect, logout, user } = useAuth0()
  useAuthToken()

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Admin - Connexion requise</h1>
        <Button onClick={() => loginWithRedirect({
          authorizationParams: {
            redirect_uri: `${window.location.origin}/admin`
          }
        })}>
          Se connecter
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/admin" className="text-xl font-bold hover:text-primary">
              Admin
            </Link>
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
              ← Retour au site
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <Button variant="outline" size="sm" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
              Déconnexion
            </Button>
          </div>
        </div>
      </header>
      <div className="flex">
        <aside className="w-64 border-r min-h-[calc(100vh-65px)]">
          <nav className="p-4 space-y-1">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.exact}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )
                }
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
