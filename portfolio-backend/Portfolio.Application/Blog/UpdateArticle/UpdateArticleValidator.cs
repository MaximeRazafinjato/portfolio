using Portfolio.Core.Common;

namespace Portfolio.Application.Blog.UpdateArticle;

public class UpdateArticleValidator : IValidator<UpdateArticleModel>
{
    public Task<Result> ValidateAsync(UpdateArticleModel model, CancellationToken cancellationToken)
    {
        var errors = new List<string>();

        if (string.IsNullOrWhiteSpace(model.Title))
            errors.Add("Le titre est requis");
        if (string.IsNullOrWhiteSpace(model.TitleEn))
            errors.Add("Le titre anglais est requis");
        if (string.IsNullOrWhiteSpace(model.Content))
            errors.Add("Le contenu est requis");
        if (string.IsNullOrWhiteSpace(model.ContentEn))
            errors.Add("Le contenu anglais est requis");
        if (string.IsNullOrWhiteSpace(model.Excerpt))
            errors.Add("L'extrait est requis");
        if (string.IsNullOrWhiteSpace(model.ExcerptEn))
            errors.Add("L'extrait anglais est requis");

        return Task.FromResult(errors.Count > 0 ? Result.Failure(errors) : Result.Success());
    }
}
