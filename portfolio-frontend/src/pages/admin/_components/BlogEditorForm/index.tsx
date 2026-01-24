import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Save, Send, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  articleFormSchema,
  type ArticleFormData,
  type ArticleDetail,
  useCreateArticleMutation,
  useUpdateArticleMutation,
} from '@/domains/blog'

interface BlogEditorFormProps {
  article?: ArticleDetail
  isEditing: boolean
}

export default function BlogEditorForm({ article, isEditing }: BlogEditorFormProps) {
  const navigate = useNavigate()
  const createMutation = useCreateArticleMutation()
  const updateMutation = useUpdateArticleMutation()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ArticleFormData>({
    resolver: zodResolver(articleFormSchema),
    defaultValues: {
      title: '',
      titleEn: '',
      content: '',
      contentEn: '',
      excerpt: '',
      excerptEn: '',
      coverImageUrl: '',
      tags: '',
      isPublished: false,
    },
  })

  useEffect(() => {
    if (article) {
      setValue('title', article.title)
      setValue('titleEn', article.titleEn)
      setValue('content', article.content)
      setValue('contentEn', article.contentEn)
      setValue('excerpt', article.excerpt)
      setValue('excerptEn', article.excerptEn)
      setValue('coverImageUrl', article.coverImageUrl || '')
      setValue('tags', article.tags.join(', '))
      setValue('isPublished', article.isPublished)
    }
  }, [article, setValue])

  const onSubmit = async (data: ArticleFormData, publish: boolean) => {
    const payload = {
      ...data,
      tags: data.tags ? data.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
      isPublished: publish,
      coverImageUrl: data.coverImageUrl || undefined,
    }

    try {
      if (isEditing && article) {
        await updateMutation.mutateAsync({ id: article.id, ...payload })
        toast.success(publish ? 'Article publié' : 'Article mis à jour')
      } else {
        await createMutation.mutateAsync(payload)
        toast.success(publish ? 'Article créé et publié' : 'Brouillon enregistré')
      }
      navigate('/admin')
    } catch {
      toast.error('Erreur lors de l\'enregistrement')
    }
  }

  const isPublished = watch('isPublished')

  const hasFrenchErrors = useMemo(() => {
    return !!(errors.title || errors.content || errors.excerpt)
  }, [errors.title, errors.content, errors.excerpt])

  const hasEnglishErrors = useMemo(() => {
    return !!(errors.titleEn || errors.contentEn || errors.excerptEn)
  }, [errors.titleEn, errors.contentEn, errors.excerptEn])

  const onInvalid = () => {
    toast.error('Veuillez corriger les erreurs du formulaire')
  }

  const handleSaveDraft = handleSubmit((data) => onSubmit(data, false), onInvalid)
  const handlePublish = handleSubmit((data) => onSubmit(data, true), onInvalid)

  return (
    <form className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Image de couverture & Tags</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="coverImageUrl">URL de l'image de couverture</Label>
            <Input
              id="coverImageUrl"
              type="url"
              placeholder="https://example.com/image.jpg"
              {...register('coverImageUrl')}
            />
            {errors.coverImageUrl && (
              <p className="text-sm text-destructive">{errors.coverImageUrl.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags (séparés par des virgules)</Label>
            <Input
              id="tags"
              placeholder="react, typescript, testing"
              {...register('tags')}
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="fr" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="fr" className="flex items-center gap-2">
            🇫🇷 Français
            {hasFrenchErrors && <AlertCircle className="h-4 w-4 text-destructive" />}
          </TabsTrigger>
          <TabsTrigger value="en" className="flex items-center gap-2">
            🇬🇧 English
            {hasEnglishErrors && <AlertCircle className="h-4 w-4 text-destructive" />}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="fr" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Contenu en français</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Titre</Label>
                <Input
                  id="title"
                  placeholder="Mon super article"
                  {...register('title')}
                  aria-invalid={errors.title ? 'true' : 'false'}
                />
                {errors.title && (
                  <p className="text-sm text-destructive">{errors.title.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Extrait</Label>
                <Textarea
                  id="excerpt"
                  placeholder="Une brève description de l'article..."
                  className="min-h-20"
                  {...register('excerpt')}
                  aria-invalid={errors.excerpt ? 'true' : 'false'}
                />
                {errors.excerpt && (
                  <p className="text-sm text-destructive">{errors.excerpt.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Contenu (Markdown)</Label>
                <Textarea
                  id="content"
                  placeholder="# Mon article&#10;&#10;Écrivez votre contenu en Markdown..."
                  className="min-h-80 font-mono text-sm"
                  {...register('content')}
                  aria-invalid={errors.content ? 'true' : 'false'}
                />
                {errors.content && (
                  <p className="text-sm text-destructive">{errors.content.message}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="en" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>English content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="titleEn">Title</Label>
                <Input
                  id="titleEn"
                  placeholder="My awesome article"
                  {...register('titleEn')}
                  aria-invalid={errors.titleEn ? 'true' : 'false'}
                />
                {errors.titleEn && (
                  <p className="text-sm text-destructive">{errors.titleEn.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerptEn">Excerpt</Label>
                <Textarea
                  id="excerptEn"
                  placeholder="A short description of the article..."
                  className="min-h-20"
                  {...register('excerptEn')}
                  aria-invalid={errors.excerptEn ? 'true' : 'false'}
                />
                {errors.excerptEn && (
                  <p className="text-sm text-destructive">{errors.excerptEn.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contentEn">Content (Markdown)</Label>
                <Textarea
                  id="contentEn"
                  placeholder="# My article&#10;&#10;Write your content in Markdown..."
                  className="min-h-80 font-mono text-sm"
                  {...register('contentEn')}
                  aria-invalid={errors.contentEn ? 'true' : 'false'}
                />
                {errors.contentEn && (
                  <p className="text-sm text-destructive">{errors.contentEn.message}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex items-center justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={handleSaveDraft}
          disabled={isSubmitting}
        >
          <Save className="mr-2 h-4 w-4" />
          {isEditing ? 'Enregistrer' : 'Sauvegarder brouillon'}
        </Button>
        <Button
          type="button"
          onClick={handlePublish}
          disabled={isSubmitting}
        >
          <Send className="mr-2 h-4 w-4" />
          {isPublished ? 'Mettre à jour' : 'Publier'}
        </Button>
      </div>
    </form>
  )
}
