using Portfolio.Core.Common;

namespace Portfolio.Core.Blog;

public class Article : BaseEntity
{
    public required string Title { get; set; }
    public required string TitleEn { get; set; }
    public required string Slug { get; set; }
    public required string Content { get; set; }
    public required string ContentEn { get; set; }
    public required string Excerpt { get; set; }
    public required string ExcerptEn { get; set; }
    public string? CoverImageUrl { get; set; }
    public required string Tags { get; set; }
    public bool IsPublished { get; set; }
    public DateTimeOffset? PublishedAt { get; set; }

    public void Publish()
    {
        IsPublished = true;
        PublishedAt = DateTimeOffset.UtcNow;
    }

    public void Unpublish()
    {
        IsPublished = false;
        PublishedAt = null;
    }

    public string[] GetTags() => string.IsNullOrEmpty(Tags) ? [] : Tags.Split(',', StringSplitOptions.RemoveEmptyEntries);

    public void SetTags(string[] tags) => Tags = string.Join(",", tags);
}
