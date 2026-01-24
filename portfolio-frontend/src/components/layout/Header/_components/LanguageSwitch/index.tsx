import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'

export default function LanguageSwitch() {
  const { i18n } = useTranslation()
  const locale = i18n.language as 'fr' | 'en'

  const handleToggle = () => {
    i18n.changeLanguage(locale === 'fr' ? 'en' : 'fr')
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleToggle}
      className="font-medium"
      aria-label={locale === 'fr' ? 'Switch to English' : 'Passer en Français'}
    >
      {locale === 'fr' ? 'EN' : 'FR'}
    </Button>
  )
}
