import { useParams } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AdminBlogEditor() {
  const { id } = useParams()
  const isEditing = Boolean(id)

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">
        {isEditing ? 'Modifier l\'article' : 'Nouvel article'}
      </h2>

      <Card>
        <CardHeader>
          <CardTitle>Éditeur</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Éditeur en construction...</p>
        </CardContent>
      </Card>
    </div>
  )
}
