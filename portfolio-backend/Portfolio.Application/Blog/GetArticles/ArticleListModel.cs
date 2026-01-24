using System.Linq.Expressions;
using Portfolio.Core.Blog;

namespace Portfolio.Application.Blog.GetArticles;

public class ArticleListModel
{
    public required Guid Id { get; set; }
    public required string Title { get; set; }
    public required string TitleEn { get; set; }
    public required string Slug { get; set; }
    public required string Excerpt { get; set; }
    public required string ExcerptEn { get; set; }
    public string? CoverImageUrl { get; set; }
    public required string[] Tags { get; set; }
    public required bool IsPublished { get; set; }
    public required DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset? PublishedAt { get; set; }

    public static readonly Expression<Func<Article, ArticleListModel>> FromArticle = article =>
        new ArticleListModel
        {
            Id = article.Id,
            Title = article.Title,
            TitleEn = article.TitleEn,
            Slug = article.Slug,
            Excerpt = article.Excerpt,
            ExcerptEn = article.ExcerptEn,
            CoverImageUrl = article.CoverImageUrl,
            Tags = article.Tags.Split(',', StringSplitOptions.RemoveEmptyEntries),
            IsPublished = article.IsPublished,
            CreatedAt = article.CreatedAt,
            PublishedAt = article.PublishedAt
        };
}
