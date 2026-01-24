namespace Portfolio.Application.Blog.UpdateArticle;

public class UpdateArticleModel
{
    public required Guid Id { get; set; }
    public required string Title { get; set; }
    public required string TitleEn { get; set; }
    public required string Content { get; set; }
    public required string ContentEn { get; set; }
    public required string Excerpt { get; set; }
    public required string ExcerptEn { get; set; }
    public string? CoverImageUrl { get; set; }
    public required string[] Tags { get; set; }
    public bool IsPublished { get; set; }
}
