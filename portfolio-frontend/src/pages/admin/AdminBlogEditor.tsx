import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useArticleByIdQuery } from '@/domains/blog'
import BlogEditorForm from './_components/BlogEditorForm'

export default function AdminBlogEditor() {
  const { id } = useParams()
  const isEditing = Boolean(id)

  const { data: article, isLoading, isError } = useArticleByIdQuery(id)

  if (isEditing && isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-96 w-full" />
      </div>
    )
  }

  if (isEditing && isError) {
    return (
      <div className="space-y-6">
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
          Erreur: Impossible de charger l'article
        </div>
        <Button variant="outline" asChild>
          <Link to="/admin">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour au dashboard
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/admin">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h2 className="text-2xl font-bold">
          {isEditing ? 'Modifier l\'article' : 'Nouvel article'}
        </h2>
      </div>

      <BlogEditorForm article={article} isEditing={isEditing} />
    </div>
  )
}
