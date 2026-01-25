using System.Linq.Expressions;
using System.Text.Json.Serialization;
using Portfolio.Core.Profile;

namespace Portfolio.Application.Profile.Languages;

public class LanguageModel
{
    [JsonPropertyName("id")]
    public Guid? Id { get; set; }

    [JsonPropertyName("nameFr")]
    public required string NameFr { get; set; }

    [JsonPropertyName("nameEn")]
    public required string NameEn { get; set; }

    [JsonPropertyName("level")]
    public required LanguageLevel Level { get; set; }

    [JsonPropertyName("displayOrder")]
    public int DisplayOrder { get; set; }

    public static readonly Expression<Func<Language, LanguageModel>> FromEntity = entity =>
        new LanguageModel
        {
            Id = entity.Id,
            NameFr = entity.NameFr,
            NameEn = entity.NameEn,
            Level = entity.Level,
            DisplayOrder = entity.DisplayOrder
        };
}
