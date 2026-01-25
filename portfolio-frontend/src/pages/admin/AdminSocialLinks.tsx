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
  useSocialLinksQuery,
  useCreateSocialLinkMutation,
  useUpdateSocialLinkMutation,
  useDeleteSocialLinkMutation,
  socialLinkSchema,
  type SocialLink,
  type SocialLinkFormData,
} from '@/domains/profile'

export default function AdminSocialLinks() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<SocialLink | null>(null)

  const { data: items, isLoading, isError } = useSocialLinksQuery()
  const createMutation = useCreateSocialLinkMutation()
  const updateMutation = useUpdateSocialLinkMutation()
  const deleteMutation = useDeleteSocialLinkMutation()

  const form = useForm<SocialLinkFormData>({
    resolver: zodResolver(socialLinkSchema),
    defaultValues: {
      platform: '',
      url: '',
      displayOrder: 0,
    },
  })

  const openCreateDialog = () => {
    setEditingItem(null)
    form.reset({ platform: '', url: '', displayOrder: items?.length ?? 0 })
    setIsDialogOpen(true)
  }

  const openEditDialog = (item: SocialLink) => {
    setEditingItem(item)
    form.reset({
      platform: item.platform,
      url: item.url,
      displayOrder: item.displayOrder,
    })
    setIsDialogOpen(true)
  }

  const onSubmit = async (data: SocialLinkFormData) => {
    try {
      if (editingItem?.id) {
        await updateMutation.mutateAsync({ id: editingItem.id, ...data })
        toast.success('Lien mis à jour')
      } else {
        await createMutation.mutateAsync(data)
        toast.success('Lien créé')
      }
      setIsDialogOpen(false)
    } catch {
      toast.error('Erreur lors de la sauvegarde')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ce lien ?')) return
    try {
      await deleteMutation.mutateAsync(id)
      toast.success('Lien supprimé')
    } catch {
      toast.error('Erreur lors de la suppression')
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
        <h2 className="text-2xl font-bold">Réseaux sociaux</h2>
        <Button onClick={openCreateDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des liens ({items?.length ?? 0})</CardTitle>
        </CardHeader>
        <CardContent>
          {items?.length === 0 ? (
            <p className="text-muted-foreground">Aucun lien social</p>
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
                      <p className="font-medium">{item.platform}</p>
                      <p className="text-sm text-muted-foreground">{item.url}</p>
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
            <DialogTitle>{editingItem ? 'Modifier le lien' : 'Nouveau lien'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="platform">Plateforme</Label>
              <Input id="platform" {...form.register('platform')} placeholder="LinkedIn, GitHub..." />
              {form.formState.errors.platform && (
                <p className="text-sm text-destructive">{form.formState.errors.platform.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="url">URL</Label>
              <Input id="url" {...form.register('url')} placeholder="https://..." />
              {form.formState.errors.url && (
                <p className="text-sm text-destructive">{form.formState.errors.url.message}</p>
              )}
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
