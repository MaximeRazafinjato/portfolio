using System.Text.Json.Serialization;

namespace Portfolio.Application.Blog.CreateArticle;

public class CreateArticleModel
{
    [JsonPropertyName("title")]
    public required string Title { get; set; }

    [JsonPropertyName("titleEn")]
    public required string TitleEn { get; set; }

    [JsonPropertyName("content")]
    public required string Content { get; set; }

    [JsonPropertyName("contentEn")]
    public required string ContentEn { get; set; }

    [JsonPropertyName("excerpt")]
    public required string Excerpt { get; set; }

    [JsonPropertyName("excerptEn")]
    public required string ExcerptEn { get; set; }

    [JsonPropertyName("coverImageUrl")]
    public string? CoverImageUrl { get; set; }

    [JsonPropertyName("tags")]
    public required string[] Tags { get; set; }

    [JsonPropertyName("isPublished")]
    public bool IsPublished { get; set; }
}
