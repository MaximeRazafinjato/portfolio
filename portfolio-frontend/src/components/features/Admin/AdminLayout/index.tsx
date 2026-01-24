import { Outlet, Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@/components/ui/button'
import { useAuthToken } from '@/hooks/useAuthToken'

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
        <Button onClick={() => loginWithRedirect()}>
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
            <Button variant="outline" size="sm" onClick={() => logout()}>
              Déconnexion
            </Button>
          </div>
        </div>
      </header>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  )
}
