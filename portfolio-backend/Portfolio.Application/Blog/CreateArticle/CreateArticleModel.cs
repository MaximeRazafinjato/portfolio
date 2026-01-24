namespace Portfolio.Application.Blog.CreateArticle;

public class CreateArticleModel
{
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
