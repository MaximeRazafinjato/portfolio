using Portfolio.Core.Blog;
using Portfolio.Core.Common;

namespace Portfolio.Application.Blog.UpdateArticle;

public class UpdateArticleService(
    IUnitOfWorkManager unitOfWorkManager,
    IArticleRepository repository,
    UpdateArticleValidator validator) : IService
{
    public async Task<Result> ExecuteAsync(UpdateArticleModel model, CancellationToken cancellationToken)
    {
        var article = await repository.GetOrDefaultAsync(model.Id, cancellationToken);
        if (article is null)
            return Result.Failure("Article non trouvé");

        var validationResult = await validator.ValidateAsync(model, cancellationToken);
        if (!validationResult.IsSuccess)
            return validationResult;

        article.Title = model.Title;
        article.TitleEn = model.TitleEn;
        article.Content = model.Content;
        article.ContentEn = model.ContentEn;
        article.Excerpt = model.Excerpt;
        article.ExcerptEn = model.ExcerptEn;
        article.CoverImageUrl = model.CoverImageUrl;
        article.SetTags(model.Tags);

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
