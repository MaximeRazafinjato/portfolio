using System.Text.Json;
using System.Text.Json.Serialization;
using Portfolio.Core.Career;

namespace Portfolio.Application.Career.Experiences;

public class ExperienceModel
{
    [JsonPropertyName("id")]
    public Guid? Id { get; set; }

    [JsonPropertyName("companyName")]
    public required string CompanyName { get; set; }

    [JsonPropertyName("positionFr")]
    public required string PositionFr { get; set; }

    [JsonPropertyName("positionEn")]
    public required string PositionEn { get; set; }

    [JsonPropertyName("periodStart")]
    public required DateTimeOffset PeriodStart { get; set; }

    [JsonPropertyName("periodEnd")]
    public DateTimeOffset? PeriodEnd { get; set; }

    [JsonPropertyName("isCurrent")]
    public bool IsCurrent { get; set; }

    [JsonPropertyName("locationFr")]
    public required string LocationFr { get; set; }

    [JsonPropertyName("locationEn")]
    public required string LocationEn { get; set; }

    [JsonPropertyName("technologies")]
    public required string[] Technologies { get; set; }

    [JsonPropertyName("responsibilitiesFr")]
    public required string[] ResponsibilitiesFr { get; set; }

    [JsonPropertyName("responsibilitiesEn")]
    public required string[] ResponsibilitiesEn { get; set; }

    [JsonPropertyName("displayOrder")]
    public int DisplayOrder { get; set; }

    public static ExperienceModel FromEntity(Experience entity) =>
        new()
        {
            Id = entity.Id,
            CompanyName = entity.CompanyName,
            PositionFr = entity.PositionFr,
            PositionEn = entity.PositionEn,
            PeriodStart = entity.PeriodStart,
            PeriodEnd = entity.PeriodEnd,
            IsCurrent = entity.IsCurrent,
            LocationFr = entity.LocationFr,
            LocationEn = entity.LocationEn,
            Technologies = entity.Technologies.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries),
            ResponsibilitiesFr = DeserializeArray(entity.ResponsibilitiesFr),
            ResponsibilitiesEn = DeserializeArray(entity.ResponsibilitiesEn),
            DisplayOrder = entity.DisplayOrder
        };

    private static string[] DeserializeArray(string json)
    {
        if (string.IsNullOrEmpty(json))
            return [];
        try
        {
            return JsonSerializer.Deserialize<string[]>(json) ?? [];
        }
        catch
        {
            return [];
        }
    }
}
