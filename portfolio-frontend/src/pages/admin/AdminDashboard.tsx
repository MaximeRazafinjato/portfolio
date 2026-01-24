import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import ArticleList from './_components/ArticleList'

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <Button asChild>
          <Link to="/admin/blog/new">
            <Plus className="mr-2 h-4 w-4" />
            Nouvel article
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Articles du blog</CardTitle>
        </CardHeader>
        <CardContent>
          <ArticleList />
        </CardContent>
      </Card>
    </div>
  )
}
