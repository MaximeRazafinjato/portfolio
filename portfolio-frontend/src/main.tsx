import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'

import { ThemeProvider } from '@/contexts/ThemeContext'
import { QueryClientProvider } from '@/contexts/QueryClientProvider'
import { auth0Config } from '@/configs/auth0'
import { router } from '@/configs/routes'

import '@/configs/i18n'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0Provider {...auth0Config}>
      <QueryClientProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </QueryClientProvider>
    </Auth0Provider>
  </StrictMode>,
)
