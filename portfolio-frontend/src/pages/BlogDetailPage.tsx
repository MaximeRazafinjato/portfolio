import { useParams } from 'react-router-dom'

export default function BlogDetailPage() {
  const { slug } = useParams()

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold">Blog Article: {slug}</h1>
      <p className="text-muted-foreground mt-4">Page en construction...</p>
    </div>
  )
}
