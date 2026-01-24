import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react'
import { useArticleBySlugQuery } from '@/domains/blog'
import { fadeInUp, staggerContainer } from '@/constants/animations'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'

import 'highlight.js/styles/github-dark.css'

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

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { t, i18n } = useTranslation()
  const locale = i18n.language as 'fr' | 'en'

  const { data: article, isLoading, isError } = useArticleBySlugQuery(slug)

  if (isLoading) {
    return <ArticleDetailSkeleton />
  }

  if (isError || !article) {
    return (
      <div className="container mx-auto min-h-screen px-4 pt-32">
        <p className="text-center text-muted-foreground">{t('common.error')}</p>
        <div className="mt-8 text-center">
          <Button variant="outline" asChild>
            <Link to="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('blog.backToList')}
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  const title = locale === 'fr' ? article.title : article.titleEn
  const content = locale === 'fr' ? article.content : article.contentEn
  const displayDate = article.publishedAt || article.createdAt
  const readTime = estimateReadTime(content)

  return (
    <div className="min-h-screen pt-20">
      <motion.article
        className="container mx-auto px-4 py-12"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={fadeInUp} className="mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/blog" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              {t('blog.backToList')}
            </Link>
          </Button>
        </motion.div>

        {article.coverImageUrl && (
          <motion.div
            variants={fadeInUp}
            className="mb-8 overflow-hidden rounded-xl"
          >
            <img
              src={article.coverImageUrl}
              alt={title}
              className="h-64 w-full object-cover md:h-96"
            />
          </motion.div>
        )}

        <motion.header variants={fadeInUp} className="mx-auto max-w-3xl">
          <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formatDate(displayDate, locale)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {t('blog.readTime', { minutes: readTime })}
            </span>
          </div>

          <h1 className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl">
            {title}
          </h1>

          {article.tags.length > 0 && (
            <div className="mb-8 flex flex-wrap items-center gap-2">
              <Tag className="h-4 w-4 text-muted-foreground" />
              {article.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </motion.header>

        <motion.div
          variants={fadeInUp}
          className="prose prose-neutral dark:prose-invert mx-auto max-w-3xl prose-headings:font-bold prose-a:text-primary prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:before:content-none prose-code:after:content-none prose-pre:bg-zinc-900 prose-pre:p-0"
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {content}
          </ReactMarkdown>
        </motion.div>
      </motion.article>
    </div>
  )
}

function ArticleDetailSkeleton() {
  return (
    <div className="container mx-auto min-h-screen px-4 pt-32">
      <Skeleton className="mb-8 h-8 w-32" />
      <Skeleton className="mb-8 h-64 w-full rounded-xl md:h-96" />
      <div className="mx-auto max-w-3xl">
        <div className="mb-4 flex gap-4">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-5 w-24" />
        </div>
        <Skeleton className="mb-6 h-12 w-3/4" />
        <div className="mb-8 flex gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-14" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
    </div>
  )
}
