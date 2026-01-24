using Microsoft.EntityFrameworkCore;
using Portfolio.Core.Blog;
using Portfolio.Core.Common;

namespace Portfolio.Application.Blog.GetArticleBySlug;

public class GetArticleBySlugService(IArticleRepository repository) : IService
{
    public async Task<ArticleDetailModel?> ExecuteAsync(string slug, bool includeUnpublished, CancellationToken cancellationToken)
    {
        var query = includeUnpublished
            ? repository.GetAll()
            : repository.GetPublished();

        return await query
            .Where(a => a.Slug == slug)
            .Select(ArticleDetailModel.FromArticle)
            .FirstOrDefaultAsync(cancellationToken);
    }
}
