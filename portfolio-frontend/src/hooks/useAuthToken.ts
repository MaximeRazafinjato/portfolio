import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'
import { setAuthToken } from '@/lib/api'

const AUTH0_AUDIENCE = import.meta.env.VITE_AUTH0_AUDIENCE

export function useAuthToken() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    async function updateToken() {
      if (isAuthenticated) {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: AUTH0_AUDIENCE,
          },
        })
        setAuthToken(token)
      } else {
        setAuthToken(null)
      }
    }

    updateToken()
  }, [isAuthenticated, getAccessTokenSilently])
}
