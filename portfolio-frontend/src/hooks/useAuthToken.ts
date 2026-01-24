import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'
import { setAuthToken } from '@/lib/api'

export function useAuthToken() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    async function updateToken() {
      if (isAuthenticated) {
        const token = await getAccessTokenSilently()
        setAuthToken(token)
      } else {
        setAuthToken(null)
      }
    }

    updateToken()
  }, [isAuthenticated, getAccessTokenSilently])
}
