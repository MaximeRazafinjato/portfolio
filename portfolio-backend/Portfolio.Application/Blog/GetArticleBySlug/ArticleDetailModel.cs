using System.Linq.Expressions;
using Portfolio.Core.Blog;

namespace Portfolio.Application.Blog.GetArticleBySlug;

public class ArticleDetailModel
{
    public required Guid Id { get; set; }
    public required string Title { get; set; }
    public required string TitleEn { get; set; }
    public required string Slug { get; set; }
    public required string Content { get; set; }
    public required string ContentEn { get; set; }
    public required string Excerpt { get; set; }
    public required string ExcerptEn { get; set; }
    public string? CoverImageUrl { get; set; }
    public required string[] Tags { get; set; }
    public required bool IsPublished { get; set; }
    public required DateTimeOffset CreatedAt { get; set; }
    public required DateTimeOffset? PublishedAt { get; set; }
    public required DateTimeOffset? UpdatedAt { get; set; }

    public static readonly Expression<Func<Article, ArticleDetailModel>> FromArticle = article =>
        new ArticleDetailModel
        {
            Id = article.Id,
            Title = article.Title,
            TitleEn = article.TitleEn,
            Slug = article.Slug,
            Content = article.Content,
            ContentEn = article.ContentEn,
            Excerpt = article.Excerpt,
            ExcerptEn = article.ExcerptEn,
            CoverImageUrl = article.CoverImageUrl,
            Tags = article.Tags.Split(',', StringSplitOptions.RemoveEmptyEntries),
            IsPublished = article.IsPublished,
            CreatedAt = article.CreatedAt,
            PublishedAt = article.PublishedAt,
            UpdatedAt = article.UpdatedAt
        };
}
