using System.Linq.Expressions;
using System.Text.Json.Serialization;

namespace Portfolio.Application.Profile.SocialLinks;

public class SocialLinkModel
{
    [JsonPropertyName("id")]
    public Guid? Id { get; set; }

    [JsonPropertyName("platform")]
    public required string Platform { get; set; }

    [JsonPropertyName("url")]
    public required string Url { get; set; }

    [JsonPropertyName("displayOrder")]
    public int DisplayOrder { get; set; }

    public static readonly Expression<Func<Core.Profile.SocialLink, SocialLinkModel>> FromEntity = entity =>
        new SocialLinkModel
        {
            Id = entity.Id,
            Platform = entity.Platform,
            Url = entity.Url,
            DisplayOrder = entity.DisplayOrder
        };
}
