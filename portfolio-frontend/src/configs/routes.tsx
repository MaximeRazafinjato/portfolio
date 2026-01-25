import { createBrowserRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react'

const MainLayout = lazy(() => import('@/components/layout/MainLayout'))
const HomePage = lazy(() => import('@/pages/HomePage'))
const BlogListPage = lazy(() => import('@/pages/blog/BlogListPage'))
const BlogDetailPage = lazy(() => import('@/pages/BlogDetailPage'))
const AdminLayout = lazy(() => import('@/components/features/Admin/AdminLayout'))
const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'))
const AdminPersonalInfo = lazy(() => import('@/pages/admin/AdminPersonalInfo'))
const AdminSocialLinks = lazy(() => import('@/pages/admin/AdminSocialLinks'))
const AdminLanguages = lazy(() => import('@/pages/admin/AdminLanguages'))
const AdminExperiences = lazy(() => import('@/pages/admin/AdminExperiences'))
const AdminEducation = lazy(() => import('@/pages/admin/AdminEducation'))
const AdminSkillCategories = lazy(() => import('@/pages/admin/AdminSkillCategories'))
const AdminSkills = lazy(() => import('@/pages/admin/AdminSkills'))
const AdminSoftSkills = lazy(() => import('@/pages/admin/AdminSoftSkills'))
const AdminProjects = lazy(() => import('@/pages/admin/AdminProjects'))
const AdminBlogList = lazy(() => import('@/pages/admin/AdminBlogList'))
const AdminBlogEditor = lazy(() => import('@/pages/admin/AdminBlogEditor'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

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
        path: 'blog',
        element: withSuspense(BlogListPage),
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
        path: 'personal-info',
        element: withSuspense(AdminPersonalInfo),
      },
      {
        path: 'social-links',
        element: withSuspense(AdminSocialLinks),
      },
      {
        path: 'languages',
        element: withSuspense(AdminLanguages),
      },
      {
        path: 'experiences',
        element: withSuspense(AdminExperiences),
      },
      {
        path: 'education',
        element: withSuspense(AdminEducation),
      },
      {
        path: 'skill-categories',
        element: withSuspense(AdminSkillCategories),
      },
      {
        path: 'skills',
        element: withSuspense(AdminSkills),
      },
      {
        path: 'soft-skills',
        element: withSuspense(AdminSoftSkills),
      },
      {
        path: 'projects',
        element: withSuspense(AdminProjects),
      },
      {
        path: 'blog',
        element: withSuspense(AdminBlogList),
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
  {
    path: '*',
    element: withSuspense(NotFoundPage),
  },
])
