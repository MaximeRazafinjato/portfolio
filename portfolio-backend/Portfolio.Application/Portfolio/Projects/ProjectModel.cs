using System.Text.Json;
using System.Text.Json.Serialization;
using Portfolio.Core.Portfolio;

namespace Portfolio.Application.Portfolio.Projects;

public class ProjectModel
{
    [JsonPropertyName("id")]
    public Guid? Id { get; set; }

    [JsonPropertyName("name")]
    public required string Name { get; set; }

    [JsonPropertyName("descriptionFr")]
    public required string DescriptionFr { get; set; }

    [JsonPropertyName("descriptionEn")]
    public required string DescriptionEn { get; set; }

    [JsonPropertyName("technologies")]
    public required string[] Technologies { get; set; }

    [JsonPropertyName("githubUrl")]
    public string? GithubUrl { get; set; }

    [JsonPropertyName("demoUrl")]
    public string? DemoUrl { get; set; }

    [JsonPropertyName("imageUrl")]
    public string? ImageUrl { get; set; }

    [JsonPropertyName("featuresFr")]
    public required string[] FeaturesFr { get; set; }

    [JsonPropertyName("featuresEn")]
    public required string[] FeaturesEn { get; set; }

    [JsonPropertyName("displayOrder")]
    public int DisplayOrder { get; set; }

    public static ProjectModel FromEntity(Project entity) =>
        new()
        {
            Id = entity.Id,
            Name = entity.Name,
            DescriptionFr = entity.DescriptionFr,
            DescriptionEn = entity.DescriptionEn,
            Technologies = entity.Technologies.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries),
            GithubUrl = entity.GithubUrl,
            DemoUrl = entity.DemoUrl,
            ImageUrl = entity.ImageUrl,
            FeaturesFr = DeserializeArray(entity.FeaturesFr),
            FeaturesEn = DeserializeArray(entity.FeaturesEn),
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
