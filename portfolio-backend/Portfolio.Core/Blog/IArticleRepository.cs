namespace Portfolio.Core.Blog;

public interface IArticleRepository
{
    Task<Article?> GetOrDefaultAsync(Guid id, CancellationToken cancellationToken);
    Task<Article?> GetOrDefaultBySlugAsync(string slug, CancellationToken cancellationToken);
    Task<bool> ExistsBySlugAsync(string slug, CancellationToken cancellationToken);
    IQueryable<Article> GetPublished();
    IQueryable<Article> GetAll();
    Task AddAsync(Article article, CancellationToken cancellationToken);
    void Update(Article article);
    void Delete(Article article);
}
