export const BLOG_QUERY_KEYS = {
  all: ['articles'] as const,
  lists: () => [...BLOG_QUERY_KEYS.all, 'list'] as const,
  list: (params?: { page?: number; pageSize?: number }) => [...BLOG_QUERY_KEYS.lists(), params] as const,
  details: () => [...BLOG_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...BLOG_QUERY_KEYS.details(), id] as const,
  bySlug: (slug: string) => [...BLOG_QUERY_KEYS.all, 'slug', slug] as const,
} as const
