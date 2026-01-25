import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Save, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {
  usePersonalInfoQuery,
  useUpsertPersonalInfoMutation,
  personalInfoSchema,
  type PersonalInfoFormData,
} from '@/domains/profile'
import { useUploadFileMutation } from '@/domains/files'

export default function AdminPersonalInfo() {
  const { data: personalInfo, isLoading, isError } = usePersonalInfoQuery()
  const upsertMutation = useUpsertPersonalInfoMutation()
  const uploadMutation = useUploadFileMutation()

  const form = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      name: '',
      titleFr: '',
      titleEn: '',
      email: '',
      phone: '',
      city: '',
      countryFr: '',
      countryEn: '',
      avatarUrl: '',
      cvUrl: '',
    },
  })

  useEffect(() => {
    if (personalInfo) {
      form.reset({
        name: personalInfo.name,
        titleFr: personalInfo.titleFr,
        titleEn: personalInfo.titleEn,
        email: personalInfo.email,
        phone: personalInfo.phone || '',
        city: personalInfo.city,
        countryFr: personalInfo.countryFr,
        countryEn: personalInfo.countryEn,
        avatarUrl: personalInfo.avatarUrl || '',
        cvUrl: personalInfo.cvUrl || '',
      })
    }
  }, [personalInfo, form])

  const onSubmit = async (data: PersonalInfoFormData) => {
    try {
      await upsertMutation.mutateAsync(data)
      toast.success('Informations personnelles mises à jour')
    } catch {
      toast.error('Erreur lors de la mise à jour')
    }
  }

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'avatarUrl' | 'cvUrl',
    folder: string
  ) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const result = await uploadMutation.mutateAsync({ file, folder })
      form.setValue(field, result.url)
      toast.success('Fichier uploadé')
    } catch {
      toast.error("Erreur lors de l'upload")
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-96 w-full" />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
        Erreur lors du chargement des informations
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Informations personnelles</h2>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Identité</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nom complet</Label>
              <Input id="name" {...form.register('name')} />
              {form.formState.errors.name && (
                <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...form.register('email')} />
              {form.formState.errors.email && (
                <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone</Label>
              <Input id="phone" {...form.register('phone')} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Titre professionnel</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="titleFr">Titre (FR)</Label>
              <Input id="titleFr" {...form.register('titleFr')} />
              {form.formState.errors.titleFr && (
                <p className="text-sm text-destructive">{form.formState.errors.titleFr.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="titleEn">Titre (EN)</Label>
              <Input id="titleEn" {...form.register('titleEn')} />
              {form.formState.errors.titleEn && (
                <p className="text-sm text-destructive">{form.formState.errors.titleEn.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Localisation</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="city">Ville</Label>
              <Input id="city" {...form.register('city')} />
              {form.formState.errors.city && (
                <p className="text-sm text-destructive">{form.formState.errors.city.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="countryFr">Pays (FR)</Label>
              <Input id="countryFr" {...form.register('countryFr')} />
              {form.formState.errors.countryFr && (
                <p className="text-sm text-destructive">{form.formState.errors.countryFr.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="countryEn">Pays (EN)</Label>
              <Input id="countryEn" {...form.register('countryEn')} />
              {form.formState.errors.countryEn && (
                <p className="text-sm text-destructive">{form.formState.errors.countryEn.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fichiers</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="avatarUrl">Avatar</Label>
              <div className="flex gap-2">
                <Input
                  id="avatarUrl"
                  {...form.register('avatarUrl')}
                  placeholder="URL de l'avatar"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => document.getElementById('avatar-upload')?.click()}
                  disabled={uploadMutation.isPending}
                >
                  <Upload className="h-4 w-4" />
                </Button>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, 'avatarUrl', 'avatars')}
                />
              </div>
              {form.watch('avatarUrl') && (
                <img
                  src={form.watch('avatarUrl')}
                  alt="Avatar preview"
                  className="mt-2 h-20 w-20 rounded-full object-cover"
                />
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvUrl">CV (PDF)</Label>
              <div className="flex gap-2">
                <Input id="cvUrl" {...form.register('cvUrl')} placeholder="URL du CV" />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => document.getElementById('cv-upload')?.click()}
                  disabled={uploadMutation.isPending}
                >
                  <Upload className="h-4 w-4" />
                </Button>
                <input
                  id="cv-upload"
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, 'cvUrl', 'cv')}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={upsertMutation.isPending}>
            <Save className="mr-2 h-4 w-4" />
            {upsertMutation.isPending ? 'Enregistrement...' : 'Enregistrer'}
          </Button>
        </div>
      </form>
    </div>
  )
}
