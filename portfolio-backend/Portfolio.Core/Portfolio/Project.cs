using Portfolio.Core.Common;

namespace Portfolio.Core.Portfolio;

public class Project : BaseEntity
{
    public required string Name { get; set; }
    public required string DescriptionFr { get; set; }
    public required string DescriptionEn { get; set; }
    public required string Technologies { get; set; }
    public string? GithubUrl { get; set; }
    public string? DemoUrl { get; set; }
    public string? ImageUrl { get; set; }
    public required string FeaturesFr { get; set; }
    public required string FeaturesEn { get; set; }
    public int DisplayOrder { get; set; }

    public string[] GetTechnologies() => string.IsNullOrEmpty(Technologies)
        ? []
        : Technologies.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

    public void SetTechnologies(string[] technologies) => Technologies = string.Join(",", technologies);

    public string[] GetFeaturesFr() => string.IsNullOrEmpty(FeaturesFr)
        ? []
        : System.Text.Json.JsonSerializer.Deserialize<string[]>(FeaturesFr) ?? [];

    public void SetFeaturesFr(string[] features) =>
        FeaturesFr = System.Text.Json.JsonSerializer.Serialize(features);

    public string[] GetFeaturesEn() => string.IsNullOrEmpty(FeaturesEn)
        ? []
        : System.Text.Json.JsonSerializer.Deserialize<string[]>(FeaturesEn) ?? [];

    public void SetFeaturesEn(string[] features) =>
        FeaturesEn = System.Text.Json.JsonSerializer.Serialize(features);

    public void Update(
        string name,
        string descriptionFr,
        string descriptionEn,
        string[] technologies,
        string? githubUrl,
        string? demoUrl,
        string? imageUrl,
        string[] featuresFr,
        string[] featuresEn,
        int displayOrder)
    {
        Name = name;
        DescriptionFr = descriptionFr;
        DescriptionEn = descriptionEn;
        SetTechnologies(technologies);
        GithubUrl = githubUrl;
        DemoUrl = demoUrl;
        ImageUrl = imageUrl;
        SetFeaturesFr(featuresFr);
        SetFeaturesEn(featuresEn);
        DisplayOrder = displayOrder;
    }
}
