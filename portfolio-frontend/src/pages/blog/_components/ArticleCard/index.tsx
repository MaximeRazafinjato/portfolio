import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { scaleIn } from '@/constants/animations'
import type { ArticleListItem } from '@/domains/blog'

interface ArticleCardProps {
  article: ArticleListItem
}

const AVERAGE_WORDS_PER_MINUTE = 200
const AVERAGE_WORD_LENGTH = 5

function estimateReadTime(content: string): number {
  const wordCount = content.length / AVERAGE_WORD_LENGTH
  return Math.max(1, Math.ceil(wordCount / AVERAGE_WORDS_PER_MINUTE))
}

function formatDate(dateString: string, locale: string): string {
  return new Date(dateString).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const { t, i18n } = useTranslation()
  const locale = i18n.language as 'fr' | 'en'

  const title = locale === 'fr' ? article.title : article.titleEn
  const excerpt = locale === 'fr' ? article.excerpt : article.excerptEn
  const displayDate = article.publishedAt || article.createdAt
  const readTime = estimateReadTime(excerpt)

  return (
    <motion.article
      variants={scaleIn}
      whileHover={{ y: -8 }}
      className="group relative flex flex-col overflow-hidden rounded-xl border bg-card transition-all hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(displayDate, locale)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {t('blog.readTime', { minutes: readTime })}
          </span>
        </div>

        <h3 className="mb-3 text-xl font-bold group-hover:text-primary">
          {title}
        </h3>

        <p className="mb-4 flex-1 text-sm text-muted-foreground line-clamp-3">
          {excerpt}
        </p>

        <Link
          to={`/blog/${article.slug}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          {t('blog.readMore')}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.article>
  )
}
