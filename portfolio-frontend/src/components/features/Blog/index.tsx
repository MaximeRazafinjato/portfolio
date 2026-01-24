import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { fadeInUp, staggerContainer } from '@/constants/animations'
import { useArticlesQuery } from '@/domains/blog'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import RecentArticleCard from './_components/RecentArticleCard'

const RECENT_ARTICLES_COUNT = 3

export default function Blog() {
  const { t } = useTranslation()

  const { data, isLoading, isError } = useArticlesQuery({
    page: 1,
    pageSize: RECENT_ARTICLES_COUNT,
    includeUnpublished: false,
  })

  const hasArticles = data && data.items.length > 0

  return (
    <section id="blog" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.h2
            variants={fadeInUp}
            className="mb-12 text-center text-3xl font-bold md:text-4xl"
          >
            {t('blog.title')}
          </motion.h2>

          {isLoading && <BlogSkeleton />}

          {isError && (
            <motion.p
              variants={fadeInUp}
              className="text-center text-muted-foreground"
            >
              {t('common.error')}
            </motion.p>
          )}

          {!isLoading && !isError && !hasArticles && (
            <motion.p
              variants={fadeInUp}
              className="text-center text-muted-foreground"
            >
              {t('blog.noArticles')}
            </motion.p>
          )}

          {hasArticles && (
            <>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {data.items.map((article) => (
                  <RecentArticleCard key={article.id} article={article} />
                ))}
              </div>

              <motion.div variants={fadeInUp} className="mt-10 text-center">
                <Button variant="outline" size="lg" asChild>
                  <Link to="/blog" className="gap-2">
                    {t('blog.viewAll')}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  )
}

function BlogSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: RECENT_ARTICLES_COUNT }).map((_, i) => (
        <div key={i} className="rounded-xl border bg-card p-6">
          <div className="mb-3 flex gap-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="mb-3 h-6 w-3/4" />
          <Skeleton className="mb-2 h-4 w-full" />
          <Skeleton className="mb-4 h-4 w-2/3" />
          <Skeleton className="h-4 w-24" />
        </div>
      ))}
    </div>
  )
}
