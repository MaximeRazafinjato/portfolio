using System.Text.Json.Serialization;

namespace Portfolio.Application.Blog.TogglePublish;

public class TogglePublishModel
{
    [JsonPropertyName("isPublished")]
    public bool IsPublished { get; set; }
}
