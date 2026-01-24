import { createBrowserRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react'

const MainLayout = lazy(() => import('@/components/layout/MainLayout'))
const HomePage = lazy(() => import('@/pages/HomePage'))
const BlogDetailPage = lazy(() => import('@/pages/BlogDetailPage'))
const AdminLayout = lazy(() => import('@/components/features/Admin/AdminLayout'))
const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'))
const AdminBlogEditor = lazy(() => import('@/pages/admin/AdminBlogEditor'))

function PageLoader() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  )
}

function withSuspense(Component: React.ComponentType) {
  return (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  )
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: withSuspense(MainLayout),
    children: [
      {
        index: true,
        element: withSuspense(HomePage),
      },
      {
        path: 'blog/:slug',
        element: withSuspense(BlogDetailPage),
      },
    ],
  },
  {
    path: '/admin',
    element: withSuspense(AdminLayout),
    children: [
      {
        index: true,
        element: withSuspense(AdminDashboard),
      },
      {
        path: 'blog/new',
        element: withSuspense(AdminBlogEditor),
      },
      {
        path: 'blog/:id/edit',
        element: withSuspense(AdminBlogEditor),
      },
    ],
  },
])
