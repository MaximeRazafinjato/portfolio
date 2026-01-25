using System.Linq.Expressions;
using System.Text.Json.Serialization;
using Portfolio.Core.Career;

namespace Portfolio.Application.Career.Educations;

public class EducationModel
{
    [JsonPropertyName("id")]
    public Guid? Id { get; set; }

    [JsonPropertyName("periodStart")]
    public required DateTimeOffset PeriodStart { get; set; }

    [JsonPropertyName("periodEnd")]
    public DateTimeOffset? PeriodEnd { get; set; }

    [JsonPropertyName("locationFr")]
    public required string LocationFr { get; set; }

    [JsonPropertyName("locationEn")]
    public required string LocationEn { get; set; }

    [JsonPropertyName("descriptionFr")]
    public required string DescriptionFr { get; set; }

    [JsonPropertyName("descriptionEn")]
    public required string DescriptionEn { get; set; }

    [JsonPropertyName("flagEmoji")]
    public string? FlagEmoji { get; set; }

    [JsonPropertyName("displayOrder")]
    public int DisplayOrder { get; set; }

    public static readonly Expression<Func<Education, EducationModel>> FromEntity = entity =>
        new EducationModel
        {
            Id = entity.Id,
            PeriodStart = entity.PeriodStart,
            PeriodEnd = entity.PeriodEnd,
            LocationFr = entity.LocationFr,
            LocationEn = entity.LocationEn,
            DescriptionFr = entity.DescriptionFr,
            DescriptionEn = entity.DescriptionEn,
            FlagEmoji = entity.FlagEmoji,
            DisplayOrder = entity.DisplayOrder
        };
}
