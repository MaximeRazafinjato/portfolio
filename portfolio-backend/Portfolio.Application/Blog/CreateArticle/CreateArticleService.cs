using System.Text.RegularExpressions;
using Portfolio.Core.Blog;
using Portfolio.Core.Common;

namespace Portfolio.Application.Blog.CreateArticle;

public partial class CreateArticleService(
    IUnitOfWorkManager unitOfWorkManager,
    IArticleRepository repository,
    CreateArticleValidator validator) : IService
{
    public async Task<Result<Guid>> ExecuteAsync(CreateArticleModel model, CancellationToken cancellationToken)
    {
        var validationResult = await validator.ValidateAsync(model, cancellationToken);
        if (!validationResult.IsSuccess)
            return Result<Guid>.Failure(validationResult.Errors);

        var slug = GenerateSlug(model.Title);
        var originalSlug = slug;
        var counter = 1;

        while (await repository.ExistsBySlugAsync(slug, cancellationToken))
        {
            slug = $"{originalSlug}-{counter++}";
        }

        var article = new Article
        {
            Id = Guid.NewGuid(),
            Title = model.Title,
            TitleEn = model.TitleEn,
            Slug = slug,
            Content = model.Content,
            ContentEn = model.ContentEn,
            Excerpt = model.Excerpt,
            ExcerptEn = model.ExcerptEn,
            CoverImageUrl = model.CoverImageUrl,
            Tags = string.Join(",", model.Tags),
            IsPublished = model.IsPublished
        };

        if (model.IsPublished)
            article.Publish();

        using (var uow = unitOfWorkManager.NewUnitOfWork())
        {
            await repository.AddAsync(article, cancellationToken);
            await uow.CommitAsync(cancellationToken);
        }

        return Result<Guid>.Success(article.Id);
    }

    private static string GenerateSlug(string title)
    {
        var slug = title.ToLowerInvariant();
        slug = RemoveDiacritics(slug);
        slug = SlugRegex().Replace(slug, "-");
        slug = slug.Trim('-');
        return slug;
    }

    private static string RemoveDiacritics(string text)
    {
        var normalized = text.Normalize(System.Text.NormalizationForm.FormD);
        var sb = new System.Text.StringBuilder();
        foreach (var c in normalized)
        {
            if (System.Globalization.CharUnicodeInfo.GetUnicodeCategory(c) != System.Globalization.UnicodeCategory.NonSpacingMark)
                sb.Append(c);
        }
        return sb.ToString().Normalize(System.Text.NormalizationForm.FormC);
    }

    [GeneratedRegex("[^a-z0-9]+")]
    private static partial Regex SlugRegex();
}
