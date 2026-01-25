import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Plus, Pencil, Trash2, GripVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
  useSkillsQuery,
  useSkillCategoriesQuery,
  useCreateSkillMutation,
  useUpdateSkillMutation,
  useDeleteSkillMutation,
  skillSchema,
  type Skill,
  type SkillFormData,
} from '@/domains/portfolio'

const ICON_OPTIONS = [
  'react', 'typescript', 'javascript', 'html5', 'css3', 'tailwind',
  'nodejs', 'dotnet', 'csharp', 'python', 'java', 'go',
  'postgresql', 'mongodb', 'redis', 'docker', 'kubernetes', 'azure',
  'git', 'github', 'gitlab', 'vscode', 'figma', 'linux',
]

export default function AdminSkills() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Skill | null>(null)

  const { data: items, isLoading, isError } = useSkillsQuery()
  const { data: categories } = useSkillCategoriesQuery()
  const createMutation = useCreateSkillMutation()
  const updateMutation = useUpdateSkillMutation()
  const deleteMutation = useDeleteSkillMutation()

  const form = useForm<SkillFormData>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      name: '',
      categoryId: '',
      iconKey: '',
      displayOrder: 0,
    },
  })

  const openCreateDialog = () => {
    setEditingItem(null)
    form.reset({
      name: '',
      categoryId: categories?.[0]?.id || '',
      iconKey: '',
      displayOrder: items?.length ?? 0,
    })
    setIsDialogOpen(true)
  }

  const openEditDialog = (item: Skill) => {
    setEditingItem(item)
    form.reset({
      name: item.name,
      categoryId: item.categoryId,
      iconKey: item.iconKey || '',
      displayOrder: item.displayOrder,
    })
    setIsDialogOpen(true)
  }

  const onSubmit = async (data: SkillFormData) => {
    try {
      if (editingItem?.id) {
        await updateMutation.mutateAsync({ id: editingItem.id, ...data })
        toast.success('Compétence mise à jour')
      } else {
        await createMutation.mutateAsync(data)
        toast.success('Compétence créée')
      }
      setIsDialogOpen(false)
    } catch {
      toast.error('Erreur lors de la sauvegarde')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cette compétence ?')) return
    try {
      await deleteMutation.mutateAsync(id)
      toast.success('Compétence supprimée')
    } catch {
      toast.error('Erreur lors de la suppression')
    }
  }

  const getCategoryName = (categoryId: string) => {
    return categories?.find((c) => c.id === categoryId)?.nameFr || 'Non catégorisé'
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
        <h2 className="text-2xl font-bold">Compétences techniques</h2>
        <Button onClick={openCreateDialog} disabled={!categories?.length}>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter
        </Button>
      </div>

      {!categories?.length && (
        <div className="rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-4 text-yellow-700">
          Veuillez d'abord créer une catégorie de compétences
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Liste des compétences ({items?.length ?? 0})</CardTitle>
        </CardHeader>
        <CardContent>
          {items?.length === 0 ? (
            <p className="text-muted-foreground">Aucune compétence</p>
          ) : (
            <div className="space-y-2">
              {items?.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center gap-3">
                    <GripVertical className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {getCategoryName(item.categoryId)}
                        {item.iconKey && ` • ${item.iconKey}`}
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingItem ? 'Modifier la compétence' : 'Nouvelle compétence'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom</Label>
              <Input id="name" {...form.register('name')} placeholder="React" />
              {form.formState.errors.name && (
                <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="categoryId">Catégorie</Label>
              <select
                id="categoryId"
                {...form.register('categoryId')}
                className="w-full rounded-md border border-input bg-background px-3 py-2"
              >
                {categories?.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nameFr}
                  </option>
                ))}
              </select>
              {form.formState.errors.categoryId && (
                <p className="text-sm text-destructive">{form.formState.errors.categoryId.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="iconKey">Icône</Label>
              <select
                id="iconKey"
                {...form.register('iconKey')}
                className="w-full rounded-md border border-input bg-background px-3 py-2"
              >
                <option value="">Aucune</option>
                {ICON_OPTIONS.map((icon) => (
                  <option key={icon} value={icon}>
                    {icon}
                  </option>
                ))}
              </select>
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
