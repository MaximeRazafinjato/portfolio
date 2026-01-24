import { useState } from 'react'
import { toast } from 'sonner'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import {
  useArticlesQuery,
  useDeleteArticleMutation,
  useTogglePublishMutation,
} from '@/domains/blog'
import ArticleListItem from '../ArticleListItem'

const PAGE_SIZE = 10

export default function ArticleList() {
  const [page, setPage] = useState(1)

  const { data, isLoading, isError, error } = useArticlesQuery({
    page,
    pageSize: PAGE_SIZE,
    includeUnpublished: true,
  })

  const deleteMutation = useDeleteArticleMutation()
  const togglePublishMutation = useTogglePublishMutation()

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      return
    }

    try {
      await deleteMutation.mutateAsync(id)
      toast.success('Article supprimé')
    } catch {
      toast.error('Erreur lors de la suppression')
    }
  }

  const handleTogglePublish = async (id: string, isPublished: boolean) => {
    try {
      await togglePublishMutation.mutateAsync({ id, isPublished })
      toast.success(isPublished ? 'Article publié' : 'Article dépublié')
    } catch {
      toast.error('Erreur lors de la mise à jour')
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
        Erreur: {error?.message || 'Impossible de charger les articles'}
      </div>
    )
  }

  if (!data || data.items.length === 0) {
    return (
      <p className="text-muted-foreground">Aucun article pour le moment.</p>
    )
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {data.items.map((article) => (
          <ArticleListItem
            key={article.id}
            article={article}
            onDelete={handleDelete}
            onTogglePublish={handleTogglePublish}
            isDeleting={deleteMutation.isPending}
            isToggling={togglePublishMutation.isPending}
          />
        ))}
      </div>

      {data.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Précédent
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {page} sur {data.totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
            disabled={page === data.totalPages}
          >
            Suivant
          </Button>
        </div>
      )}
    </div>
  )
}
