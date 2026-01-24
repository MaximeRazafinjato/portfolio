using Microsoft.EntityFrameworkCore;
using Portfolio.Core.Blog;
using Portfolio.Infrastructure.Data;

namespace Portfolio.Infrastructure.Repositories;

public class ArticleRepository(PortfolioDbContext context) : IArticleRepository
{
    public Task<Article?> GetOrDefaultAsync(Guid id, CancellationToken cancellationToken)
        => context.Articles.FirstOrDefaultAsync(a => a.Id == id, cancellationToken);

    public Task<Article?> GetOrDefaultBySlugAsync(string slug, CancellationToken cancellationToken)
        => context.Articles.FirstOrDefaultAsync(a => a.Slug == slug, cancellationToken);

    public Task<bool> ExistsBySlugAsync(string slug, CancellationToken cancellationToken)
        => context.Articles.AnyAsync(a => a.Slug == slug, cancellationToken);

    public IQueryable<Article> GetPublished()
        => context.Articles.AsNoTracking().Where(a => a.IsPublished).OrderByDescending(a => a.PublishedAt);

    public IQueryable<Article> GetAll()
        => context.Articles.AsNoTracking().OrderByDescending(a => a.CreatedAt);

    public async Task AddAsync(Article article, CancellationToken cancellationToken)
        => await context.Articles.AddAsync(article, cancellationToken);

    public void Update(Article article)
        => context.Articles.Update(article);

    public void Delete(Article article)
        => context.Articles.Remove(article);
}
