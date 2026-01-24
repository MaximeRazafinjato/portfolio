import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <Button asChild>
          <Link to="/admin/blog/new">Nouvel article</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Articles du blog</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Aucun article pour le moment.</p>
        </CardContent>
      </Card>
    </div>
  )
}
