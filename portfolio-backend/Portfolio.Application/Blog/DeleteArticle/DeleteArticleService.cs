using Portfolio.Core.Blog;
using Portfolio.Core.Common;

namespace Portfolio.Application.Blog.DeleteArticle;

public class DeleteArticleService(
    IUnitOfWorkManager unitOfWorkManager,
    IArticleRepository repository) : IService
{
    public async Task<Result> ExecuteAsync(Guid id, CancellationToken cancellationToken)
    {
        var article = await repository.GetOrDefaultAsync(id, cancellationToken);
        if (article is null)
            return Result.Failure("Article non trouvé");

        using (var uow = unitOfWorkManager.NewUnitOfWork())
        {
            repository.Delete(article);
            await uow.CommitAsync(cancellationToken);
        }

        return Result.Success();
    }
}
