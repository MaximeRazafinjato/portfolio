using Portfolio.Core.Blog;
using Portfolio.Core.Common;

namespace Portfolio.Application.Blog.TogglePublish;

public class TogglePublishService(
    IUnitOfWorkManager unitOfWorkManager,
    IArticleRepository repository) : IService
{
    public async Task<Result> ExecuteAsync(Guid id, TogglePublishModel model, CancellationToken cancellationToken)
    {
        var article = await repository.GetOrDefaultAsync(id, cancellationToken);
        if (article is null)
            return Result.Failure("Article non trouvé");

        if (model.IsPublished && !article.IsPublished)
            article.Publish();
        else if (!model.IsPublished && article.IsPublished)
            article.Unpublish();

        using (var uow = unitOfWorkManager.NewUnitOfWork())
        {
            repository.Update(article);
            await uow.CommitAsync(cancellationToken);
        }

        return Result.Success();
    }
}
