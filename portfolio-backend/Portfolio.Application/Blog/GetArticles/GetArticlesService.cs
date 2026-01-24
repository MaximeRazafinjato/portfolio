using Microsoft.EntityFrameworkCore;
using Portfolio.Core.Blog;
using Portfolio.Core.Common;

namespace Portfolio.Application.Blog.GetArticles;

public class GetArticlesService(IArticleRepository repository) : IService
{
    public async Task<PaginatedResult<ArticleListModel>> ExecuteAsync(int page, int pageSize, CancellationToken cancellationToken)
    {
        var query = repository.GetPublished();

        var totalCount = await query.CountAsync(cancellationToken);

        var items = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(ArticleListModel.FromArticle)
            .ToListAsync(cancellationToken);

        return new PaginatedResult<ArticleListModel>
        {
            Items = items,
            TotalCount = totalCount,
            Page = page,
            PageSize = pageSize
        };
    }
}
