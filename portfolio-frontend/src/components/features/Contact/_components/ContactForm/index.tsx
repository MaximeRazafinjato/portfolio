import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Send, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { fadeInUp } from '@/constants/animations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { contactFormSchema, type ContactFormData } from './types'

const FORM_SUBMIT_DELAY_MS = 1500

export default function ContactForm() {
  const { t } = useTranslation()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, FORM_SUBMIT_DELAY_MS))

    console.log('Form data:', data)
    toast.success(t('contact.form.success'))
    reset()
    setIsSubmitting(false)
  }

  return (
    <motion.form
      variants={fadeInUp}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">{t('contact.form.name')}</Label>
          <Input
            id="name"
            {...register('name')}
            placeholder={t('contact.form.name')}
            className={errors.name ? 'border-destructive' : ''}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">{t('contact.form.email')}</Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder={t('contact.form.email')}
            className={errors.email ? 'border-destructive' : ''}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">{t('contact.form.subject')}</Label>
        <Input
          id="subject"
          {...register('subject')}
          placeholder={t('contact.form.subject')}
          className={errors.subject ? 'border-destructive' : ''}
        />
        {errors.subject && (
          <p className="text-sm text-destructive">{errors.subject.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">{t('contact.form.message')}</Label>
        <textarea
          id="message"
          {...register('message')}
          placeholder={t('contact.form.message')}
          rows={5}
          className={`flex w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
            errors.message ? 'border-destructive' : 'border-input'
          }`}
        />
        {errors.message && (
          <p className="text-sm text-destructive">{errors.message.message}</p>
        )}
      </div>

      <Button type="submit" size="lg" className="w-full gap-2" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {t('contact.form.sending')}
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            {t('contact.form.submit')}
          </>
        )}
      </Button>
    </motion.form>
  )
}
