import { useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Plus, Pencil, Trash2, GripVertical, X, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  useProjectsQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  projectSchema,
  type Project,
  type ProjectFormData,
} from '@/domains/portfolio'
import { useUploadFileMutation } from '@/domains/files'

export default function AdminProjects() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Project | null>(null)

  const { data: items, isLoading, isError } = useProjectsQuery()
  const createMutation = useCreateProjectMutation()
  const updateMutation = useUpdateProjectMutation()
  const deleteMutation = useDeleteProjectMutation()
  const uploadMutation = useUploadFileMutation()

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: '',
      descriptionFr: '',
      descriptionEn: '',
      technologies: [],
      githubUrl: '',
      demoUrl: '',
      imageUrl: '',
      featuresFr: [],
      featuresEn: [],
      displayOrder: 0,
    },
  })

  const technologiesArray = useFieldArray({ control: form.control, name: 'technologies' as never })
  const featuresFrArray = useFieldArray({ control: form.control, name: 'featuresFr' as never })
  const featuresEnArray = useFieldArray({ control: form.control, name: 'featuresEn' as never })

  const openCreateDialog = () => {
    setEditingItem(null)
    form.reset({
      name: '',
      descriptionFr: '',
      descriptionEn: '',
      technologies: [],
      githubUrl: '',
      demoUrl: '',
      imageUrl: '',
      featuresFr: [],
      featuresEn: [],
      displayOrder: items?.length ?? 0,
    })
    setIsDialogOpen(true)
  }

  const openEditDialog = (item: Project) => {
    setEditingItem(item)
    form.reset({
      name: item.name,
      descriptionFr: item.descriptionFr,
      descriptionEn: item.descriptionEn,
      technologies: item.technologies,
      githubUrl: item.githubUrl || '',
      demoUrl: item.demoUrl || '',
      imageUrl: item.imageUrl || '',
      featuresFr: item.featuresFr,
      featuresEn: item.featuresEn,
      displayOrder: item.displayOrder,
    })
    setIsDialogOpen(true)
  }

  const onSubmit = async (data: ProjectFormData) => {
    try {
      const cleanedData = {
        ...data,
        githubUrl: data.githubUrl || undefined,
        demoUrl: data.demoUrl || undefined,
        imageUrl: data.imageUrl || undefined,
      }
      if (editingItem?.id) {
        await updateMutation.mutateAsync({ id: editingItem.id, ...cleanedData })
        toast.success('Projet mis à jour')
      } else {
        await createMutation.mutateAsync(cleanedData)
        toast.success('Projet créé')
      }
      setIsDialogOpen(false)
    } catch {
      toast.error('Erreur lors de la sauvegarde')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ce projet ?')) return
    try {
      await deleteMutation.mutateAsync(id)
      toast.success('Projet supprimé')
    } catch {
      toast.error('Erreur lors de la suppression')
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const result = await uploadMutation.mutateAsync({ file, folder: 'projects' })
      form.setValue('imageUrl', result.url)
      toast.success('Image uploadée')
    } catch {
      toast.error("Erreur lors de l'upload")
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
        Erreur lors du chargement
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Projets</h2>
        <Button onClick={openCreateDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des projets ({items?.length ?? 0})</CardTitle>
        </CardHeader>
        <CardContent>
          {items?.length === 0 ? (
            <p className="text-muted-foreground">Aucun projet</p>
          ) : (
            <div className="space-y-2">
              {items?.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center gap-3">
                    <GripVertical className="h-4 w-4 text-muted-foreground" />
                    {item.imageUrl && (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="h-10 w-10 rounded object-cover"
                      />
                    )}
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.technologies.slice(0, 3).join(', ')}
                        {item.technologies.length > 3 && '...'}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(item)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => item.id && handleDelete(item.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingItem ? 'Modifier le projet' : 'Nouveau projet'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom</Label>
              <Input id="name" {...form.register('name')} />
              {form.formState.errors.name && (
                <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="descriptionFr">Description (FR)</Label>
                <Textarea id="descriptionFr" {...form.register('descriptionFr')} rows={3} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="descriptionEn">Description (EN)</Label>
                <Textarea id="descriptionEn" {...form.register('descriptionEn')} rows={3} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Technologies</Label>
              <div className="flex flex-wrap gap-2">
                {technologiesArray.fields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-1 rounded bg-muted px-2 py-1">
                    <Input
                      {...form.register(`technologies.${index}` as const)}
                      className="h-6 w-24 border-0 bg-transparent p-0 text-sm"
                    />
                    <button type="button" onClick={() => technologiesArray.remove(index)}>
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => technologiesArray.append('' as never)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="githubUrl">URL GitHub</Label>
                <Input id="githubUrl" {...form.register('githubUrl')} placeholder="https://github.com/..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="demoUrl">URL Démo</Label>
                <Input id="demoUrl" {...form.register('demoUrl')} placeholder="https://..." />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image</Label>
              <div className="flex gap-2">
                <Input id="imageUrl" {...form.register('imageUrl')} placeholder="URL de l'image" />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => document.getElementById('image-upload')?.click()}
                  disabled={uploadMutation.isPending}
                >
                  <Upload className="h-4 w-4" />
                </Button>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>
              {form.watch('imageUrl') && (
                <img
                  src={form.watch('imageUrl')}
                  alt="Preview"
                  className="mt-2 h-32 w-auto rounded object-cover"
                />
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Features (FR)</Label>
                {featuresFrArray.fields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <Input {...form.register(`featuresFr.${index}` as const)} />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => featuresFrArray.remove(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => featuresFrArray.append('' as never)}
                >
                  <Plus className="mr-2 h-3 w-3" />
                  Ajouter
                </Button>
              </div>
              <div className="space-y-2">
                <Label>Features (EN)</Label>
                {featuresEnArray.fields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <Input {...form.register(`featuresEn.${index}` as const)} />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => featuresEnArray.remove(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => featuresEnArray.append('' as never)}
                >
                  <Plus className="mr-2 h-3 w-3" />
                  Ajouter
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="displayOrder">Ordre d'affichage</Label>
              <Input
                id="displayOrder"
                type="number"
                {...form.register('displayOrder', { valueAsNumber: true })}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Annuler
              </Button>
              <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                {editingItem ? 'Modifier' : 'Créer'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
