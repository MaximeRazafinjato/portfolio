import { Link } from 'react-router-dom'
import { Pencil, Trash2, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { ArticleListItem as ArticleListItemType } from '@/domains/blog'

interface ArticleListItemProps {
  article: ArticleListItemType
  onDelete: (id: string) => void
  onTogglePublish: (id: string, isPublished: boolean) => void
  isDeleting?: boolean
  isToggling?: boolean
}

export default function ArticleListItem({
  article,
  onDelete,
  onTogglePublish,
  isDeleting,
  isToggling,
}: ArticleListItemProps) {
  const formattedDate = new Date(article.createdAt).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

  return (
    <div className="flex items-center justify-between rounded-lg border p-4">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-medium">{article.title}</h3>
          <Badge variant={article.isPublished ? 'default' : 'secondary'}>
            {article.isPublished ? 'Publié' : 'Brouillon'}
          </Badge>
        </div>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
          {article.excerpt}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">{formattedDate}</p>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onTogglePublish(article.id, !article.isPublished)}
          disabled={isToggling}
          title={article.isPublished ? 'Dépublier' : 'Publier'}
        >
          {article.isPublished ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
        <Button variant="ghost" size="icon" asChild>
          <Link to={`/admin/blog/${article.id}/edit`} title="Modifier">
            <Pencil className="h-4 w-4" />
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(article.id)}
          disabled={isDeleting}
          className="text-destructive hover:text-destructive"
          title="Supprimer"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
