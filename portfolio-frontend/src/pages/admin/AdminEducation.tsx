import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Plus, Pencil, Trash2, GripVertical } from 'lucide-react'
import { getYearFromDate } from '@/utils/formatters'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { YearPicker } from '@/components/ui/year-picker'
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
  useEducationQuery,
  useCreateEducationMutation,
  useUpdateEducationMutation,
  useDeleteEducationMutation,
  educationSchema,
  type Education,
  type EducationFormData,
} from '@/domains/career'

export default function AdminEducation() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Education | null>(null)

  const { data: items, isLoading, isError } = useEducationQuery()
  const createMutation = useCreateEducationMutation()
  const updateMutation = useUpdateEducationMutation()
  const deleteMutation = useDeleteEducationMutation()

  const form = useForm<EducationFormData>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      periodStart: '',
      periodEnd: '',
      locationFr: '',
      locationEn: '',
      descriptionFr: '',
      descriptionEn: '',
      flagEmoji: '',
      displayOrder: 0,
    },
  })

  const openCreateDialog = () => {
    setEditingItem(null)
    form.reset({
      periodStart: '',
      periodEnd: '',
      locationFr: '',
      locationEn: '',
      descriptionFr: '',
      descriptionEn: '',
      flagEmoji: '',
      displayOrder: items?.length ?? 0,
    })
    setIsDialogOpen(true)
  }

  const openEditDialog = (item: Education) => {
    setEditingItem(item)
    form.reset({
      periodStart: item.periodStart,
      periodEnd: item.periodEnd || '',
      locationFr: item.locationFr,
      locationEn: item.locationEn,
      descriptionFr: item.descriptionFr,
      descriptionEn: item.descriptionEn,
      flagEmoji: item.flagEmoji || '',
      displayOrder: item.displayOrder,
    })
    setIsDialogOpen(true)
  }

  const onSubmit = async (data: EducationFormData) => {
    try {
      if (editingItem?.id) {
        await updateMutation.mutateAsync({ id: editingItem.id, ...data })
        toast.success('Parcours mis à jour')
      } else {
        await createMutation.mutateAsync(data)
        toast.success('Parcours créé')
      }
      setIsDialogOpen(false)
    } catch {
      toast.error('Erreur lors de la sauvegarde')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ce parcours ?')) return
    try {
      await deleteMutation.mutateAsync(id)
      toast.success('Parcours supprimé')
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
        <h2 className="text-2xl font-bold">Parcours / Formation</h2>
        <Button onClick={openCreateDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste ({items?.length ?? 0})</CardTitle>
        </CardHeader>
        <CardContent>
          {items?.length === 0 ? (
            <p className="text-muted-foreground">Aucun parcours</p>
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
                      <p className="font-medium">
                        {item.flagEmoji} {item.descriptionFr}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {item.locationFr} • {getYearFromDate(item.periodStart)} - {item.periodEnd ? getYearFromDate(item.periodEnd) : 'Présent'}
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
            <DialogTitle>{editingItem ? 'Modifier le parcours' : 'Nouveau parcours'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label>Début</Label>
                <Controller
                  name="periodStart"
                  control={form.control}
                  render={({ field }) => (
                    <YearPicker
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Année"
                    />
                  )}
                />
                {form.formState.errors.periodStart && (
                  <p className="text-sm text-destructive">{form.formState.errors.periodStart.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Fin</Label>
                <Controller
                  name="periodEnd"
                  control={form.control}
                  render={({ field }) => (
                    <YearPicker
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Année"
                    />
                  )}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="flagEmoji">Emoji drapeau</Label>
                <Input id="flagEmoji" {...form.register('flagEmoji')} placeholder="🇫🇷" />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="locationFr">Lieu (FR)</Label>
                <Input id="locationFr" {...form.register('locationFr')} />
                {form.formState.errors.locationFr && (
                  <p className="text-sm text-destructive">{form.formState.errors.locationFr.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="locationEn">Lieu (EN)</Label>
                <Input id="locationEn" {...form.register('locationEn')} />
                {form.formState.errors.locationEn && (
                  <p className="text-sm text-destructive">{form.formState.errors.locationEn.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="descriptionFr">Description (FR)</Label>
              <Textarea id="descriptionFr" {...form.register('descriptionFr')} rows={3} />
              {form.formState.errors.descriptionFr && (
                <p className="text-sm text-destructive">{form.formState.errors.descriptionFr.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="descriptionEn">Description (EN)</Label>
              <Textarea id="descriptionEn" {...form.register('descriptionEn')} rows={3} />
              {form.formState.errors.descriptionEn && (
                <p className="text-sm text-destructive">{form.formState.errors.descriptionEn.message}</p>
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
