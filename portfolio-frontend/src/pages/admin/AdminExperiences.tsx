import { useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Plus, Pencil, Trash2, GripVertical, X } from 'lucide-react'

const formatPeriodDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    month: 'short',
    year: 'numeric',
  })
}
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
  useExperiencesQuery,
  useCreateExperienceMutation,
  useUpdateExperienceMutation,
  useDeleteExperienceMutation,
  experienceSchema,
  type Experience,
  type ExperienceFormData,
} from '@/domains/career'

export default function AdminExperiences() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Experience | null>(null)

  const { data: items, isLoading, isError } = useExperiencesQuery()
  const createMutation = useCreateExperienceMutation()
  const updateMutation = useUpdateExperienceMutation()
  const deleteMutation = useDeleteExperienceMutation()

  const form = useForm<ExperienceFormData>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      companyName: '',
      positionFr: '',
      positionEn: '',
      periodStart: '',
      periodEnd: '',
      isCurrent: false,
      locationFr: '',
      locationEn: '',
      technologies: [],
      responsibilitiesFr: [],
      responsibilitiesEn: [],
      displayOrder: 0,
    },
  })

  const technologiesArray = useFieldArray({ control: form.control, name: 'technologies' as never })
  const respFrArray = useFieldArray({ control: form.control, name: 'responsibilitiesFr' as never })
  const respEnArray = useFieldArray({ control: form.control, name: 'responsibilitiesEn' as never })

  const openCreateDialog = () => {
    setEditingItem(null)
    form.reset({
      companyName: '',
      positionFr: '',
      positionEn: '',
      periodStart: '',
      periodEnd: '',
      isCurrent: false,
      locationFr: '',
      locationEn: '',
      technologies: [],
      responsibilitiesFr: [],
      responsibilitiesEn: [],
      displayOrder: items?.length ?? 0,
    })
    setIsDialogOpen(true)
  }

  const openEditDialog = (item: Experience) => {
    setEditingItem(item)
    form.reset({
      companyName: item.companyName,
      positionFr: item.positionFr,
      positionEn: item.positionEn,
      periodStart: item.periodStart,
      periodEnd: item.periodEnd || '',
      isCurrent: item.isCurrent,
      locationFr: item.locationFr,
      locationEn: item.locationEn,
      technologies: item.technologies,
      responsibilitiesFr: item.responsibilitiesFr,
      responsibilitiesEn: item.responsibilitiesEn,
      displayOrder: item.displayOrder,
    })
    setIsDialogOpen(true)
  }

  const onSubmit = async (data: ExperienceFormData) => {
    try {
      if (editingItem?.id) {
        await updateMutation.mutateAsync({ id: editingItem.id, ...data })
        toast.success('Expérience mise à jour')
      } else {
        await createMutation.mutateAsync(data)
        toast.success('Expérience créée')
      }
      setIsDialogOpen(false)
    } catch {
      toast.error('Erreur lors de la sauvegarde')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cette expérience ?')) return
    try {
      await deleteMutation.mutateAsync(id)
      toast.success('Expérience supprimée')
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
        <h2 className="text-2xl font-bold">Expériences professionnelles</h2>
        <Button onClick={openCreateDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des expériences ({items?.length ?? 0})</CardTitle>
        </CardHeader>
        <CardContent>
          {items?.length === 0 ? (
            <p className="text-muted-foreground">Aucune expérience</p>
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
                      <p className="font-medium">{item.companyName}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.positionFr} • {formatPeriodDate(item.periodStart)} - {item.isCurrent ? 'Présent' : formatPeriodDate(item.periodEnd || '')}
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
        <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingItem ? "Modifier l'expérience" : 'Nouvelle expérience'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Entreprise</Label>
              <Input id="companyName" {...form.register('companyName')} />
              {form.formState.errors.companyName && (
                <p className="text-sm text-destructive">{form.formState.errors.companyName.message}</p>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="positionFr">Poste (FR)</Label>
                <Input id="positionFr" {...form.register('positionFr')} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="positionEn">Poste (EN)</Label>
                <Input id="positionEn" {...form.register('positionEn')} />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="periodStart">Début</Label>
                <Input id="periodStart" {...form.register('periodStart')} placeholder="Jan 2023" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="periodEnd">Fin</Label>
                <Input
                  id="periodEnd"
                  {...form.register('periodEnd')}
                  placeholder="Déc 2024"
                  disabled={form.watch('isCurrent')}
                />
              </div>
              <div className="flex items-end gap-2">
                <input
                  type="checkbox"
                  id="isCurrent"
                  {...form.register('isCurrent')}
                  className="h-4 w-4"
                />
                <Label htmlFor="isCurrent">Poste actuel</Label>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="locationFr">Lieu (FR)</Label>
                <Input id="locationFr" {...form.register('locationFr')} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="locationEn">Lieu (EN)</Label>
                <Input id="locationEn" {...form.register('locationEn')} />
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
                <Label>Responsabilités (FR)</Label>
                {respFrArray.fields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <Input {...form.register(`responsibilitiesFr.${index}` as const)} />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => respFrArray.remove(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => respFrArray.append('' as never)}
                >
                  <Plus className="mr-2 h-3 w-3" />
                  Ajouter
                </Button>
              </div>
              <div className="space-y-2">
                <Label>Responsabilités (EN)</Label>
                {respEnArray.fields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <Input {...form.register(`responsibilitiesEn.${index}` as const)} />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => respEnArray.remove(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => respEnArray.append('' as never)}
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
