using System.Linq.Expressions;
using System.Text.Json.Serialization;
using Portfolio.Core.Portfolio;

namespace Portfolio.Application.Portfolio.Skills;

public class SkillModel
{
    [JsonPropertyName("id")]
    public Guid? Id { get; set; }

    [JsonPropertyName("name")]
    public required string Name { get; set; }

    [JsonPropertyName("categoryId")]
    public required Guid CategoryId { get; set; }

    [JsonPropertyName("iconKey")]
    public string? IconKey { get; set; }

    [JsonPropertyName("displayOrder")]
    public int DisplayOrder { get; set; }

    public static readonly Expression<Func<Skill, SkillModel>> FromEntity = entity =>
        new SkillModel
        {
            Id = entity.Id,
            Name = entity.Name,
            CategoryId = entity.CategoryId,
            IconKey = entity.IconKey,
            DisplayOrder = entity.DisplayOrder
        };
}
