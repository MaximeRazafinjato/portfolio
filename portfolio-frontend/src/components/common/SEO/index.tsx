import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  tags?: string[]
  noIndex?: boolean
}

const SITE_NAME = 'Maxime Razafinjato'
const DEFAULT_IMAGE = '/og-image.png'
const BASE_URL = 'https://maximerazafinjato.com'

function SEO({
  title,
  description,
  image = DEFAULT_IMAGE,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  tags,
  noIndex = false,
}: SEOProps) {
  const { t, i18n } = useTranslation()

  const pageTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} - ${t('seo.defaultTitle')}`
  const pageDescription = description || t('seo.defaultDescription')
  const pageUrl = url ? `${BASE_URL}${url}` : BASE_URL
  const pageImage = image.startsWith('http') ? image : `${BASE_URL}${image}`
  const locale = i18n.language === 'fr' ? 'fr_FR' : 'en_US'

  return (
    <Helmet>
      <html lang={i18n.language} />
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <link rel="canonical" href={pageUrl} />

      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:locale" content={locale} />
      <meta property="og:locale:alternate" content={locale === 'fr_FR' ? 'en_US' : 'fr_FR'} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageImage} />

      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && tags?.map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}
    </Helmet>
  )
}

export default SEO
