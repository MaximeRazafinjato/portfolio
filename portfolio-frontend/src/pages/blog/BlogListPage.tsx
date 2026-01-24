import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/constants/animations'
import { useArticlesQuery } from '@/domains/blog'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import SEO from '@/components/common/SEO'
import ArticleCard from './_components/ArticleCard'

const PAGE_SIZE = 6

export default function BlogListPage() {
  const { t } = useTranslation()
  const [page, setPage] = useState(1)

  const { data, isLoading, isError } = useArticlesQuery({
    page,
    pageSize: PAGE_SIZE,
    includeUnpublished: false,
  })

  const handlePreviousPage = () => {
    setPage((p) => Math.max(1, p - 1))
  }

  const handleNextPage = () => {
    if (data && page < data.totalPages) {
      setPage((p) => p + 1)
    }
  }

  return (
    <>
      <SEO
        title={t('seo.blogTitle')}
        description={t('seo.blogDescription')}
        url="/blog"
      />
      <div className="min-h-screen pt-20">
        <div className="container mx-auto px-4 py-12">
          <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={fadeInUp}
            className="mb-12 text-center text-4xl font-bold md:text-5xl"
          >
            {t('blog.title')}
          </motion.h1>

          {isLoading && <ArticleListSkeleton />}

          {isError && (
            <motion.p
              variants={fadeInUp}
              className="text-center text-muted-foreground"
            >
              {t('common.error')}
            </motion.p>
          )}

          {data && data.items.length === 0 && (
            <motion.p
              variants={fadeInUp}
              className="text-center text-muted-foreground"
            >
              {t('blog.noArticles')}
            </motion.p>
          )}

          {data && data.items.length > 0 && (
            <>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {data.items.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>

              {data.totalPages > 1 && (
                <motion.div
                  variants={fadeInUp}
                  className="mt-12 flex items-center justify-center gap-4"
                >
                  <Button
                    variant="outline"
                    onClick={handlePreviousPage}
                    disabled={page === 1}
                  >
                    &larr;
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    {page} / {data.totalPages}
                  </span>
                  <Button
                    variant="outline"
                    onClick={handleNextPage}
                    disabled={page >= data.totalPages}
                  >
                    &rarr;
                  </Button>
                </motion.div>
              )}
            </>
          )}
          </motion.div>
        </div>
      </div>
    </>
  )
}

function ArticleListSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-xl border bg-card p-6">
          <div className="mb-3 flex gap-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="mb-3 h-6 w-3/4" />
          <Skeleton className="mb-2 h-4 w-full" />
          <Skeleton className="mb-2 h-4 w-full" />
          <Skeleton className="mb-4 h-4 w-2/3" />
          <Skeleton className="h-4 w-24" />
        </div>
      ))}
    </div>
  )
}
