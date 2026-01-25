import { useState, useMemo } from 'react'
import { useForm, Controller } from 'react-hook-form'
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
import { Combobox, type ComboboxOption } from '@/components/ui/combobox'
import {
  useLanguagesQuery,
  useCreateLanguageMutation,
  useUpdateLanguageMutation,
  useDeleteLanguageMutation,
  languageSchema,
  type Language,
  type LanguageFormData,
  LANGUAGE_LEVELS,
} from '@/domains/profile'

export default function AdminLanguages() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Language | null>(null)

  const { data: items, isLoading, isError } = useLanguagesQuery()
  const createMutation = useCreateLanguageMutation()
  const updateMutation = useUpdateLanguageMutation()
  const deleteMutation = useDeleteLanguageMutation()

  const levelOptions: ComboboxOption[] = useMemo(() => {
    return LANGUAGE_LEVELS.map((level) => ({
      value: level,
      label: level,
    }))
  }, [])

  const form = useForm<LanguageFormData>({
    resolver: zodResolver(languageSchema),
    defaultValues: {
      nameFr: '',
      nameEn: '',
      level: 'Intermediate',
      displayOrder: 0,
    },
  })

  const openCreateDialog = () => {
    setEditingItem(null)
    form.reset({ nameFr: '', nameEn: '', level: 'Intermediate', displayOrder: items?.length ?? 0 })
    setIsDialogOpen(true)
  }

  const openEditDialog = (item: Language) => {
    setEditingItem(item)
    form.reset({
      nameFr: item.nameFr,
      nameEn: item.nameEn,
      level: item.level,
      displayOrder: item.displayOrder,
    })
    setIsDialogOpen(true)
  }

  const onSubmit = async (data: LanguageFormData) => {
    try {
      if (editingItem?.id) {
        await updateMutation.mutateAsync({ id: editingItem.id, ...data })
        toast.success('Langue mise à jour')
      } else {
        await createMutation.mutateAsync(data)
        toast.success('Langue créée')
      }
      setIsDialogOpen(false)
    } catch {
      toast.error('Erreur lors de la sauvegarde')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cette langue ?')) return
    try {
      await deleteMutation.mutateAsync(id)
      toast.success('Langue supprimée')
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
        <h2 className="text-2xl font-bold">Langues</h2>
        <Button onClick={openCreateDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des langues ({items?.length ?? 0})</CardTitle>
        </CardHeader>
        <CardContent>
          {items?.length === 0 ? (
            <p className="text-muted-foreground">Aucune langue</p>
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
                      <p className="font-medium">{item.nameFr}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.nameEn} - {item.level}
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
            <DialogTitle>{editingItem ? 'Modifier la langue' : 'Nouvelle langue'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nameFr">Nom (FR)</Label>
                <Input id="nameFr" {...form.register('nameFr')} placeholder="Français" />
                {form.formState.errors.nameFr && (
                  <p className="text-sm text-destructive">{form.formState.errors.nameFr.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="nameEn">Nom (EN)</Label>
                <Input id="nameEn" {...form.register('nameEn')} placeholder="French" />
                {form.formState.errors.nameEn && (
                  <p className="text-sm text-destructive">{form.formState.errors.nameEn.message}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Niveau</Label>
              <Controller
                name="level"
                control={form.control}
                render={({ field }) => (
                  <Combobox
                    options={levelOptions}
                    value={field.value}
                    onValueChange={field.onChange}
                    placeholder="Sélectionner un niveau..."
                    searchPlaceholder="Rechercher..."
                    emptyMessage="Aucun niveau trouvé."
                  />
                )}
              />
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
