using System.Linq.Expressions;
using System.Text.Json.Serialization;
using Portfolio.Core.Portfolio;

namespace Portfolio.Application.Portfolio.SkillCategories;

public class SkillCategoryModel
{
    [JsonPropertyName("id")]
    public Guid? Id { get; set; }

    [JsonPropertyName("nameFr")]
    public required string NameFr { get; set; }

    [JsonPropertyName("nameEn")]
    public required string NameEn { get; set; }

    [JsonPropertyName("displayOrder")]
    public int DisplayOrder { get; set; }

    [JsonPropertyName("skills")]
    public List<SkillItemModel>? Skills { get; set; }

    public static readonly Expression<Func<SkillCategory, SkillCategoryModel>> FromEntity = entity =>
        new SkillCategoryModel
        {
            Id = entity.Id,
            NameFr = entity.NameFr,
            NameEn = entity.NameEn,
            DisplayOrder = entity.DisplayOrder,
            Skills = entity.Skills.Select(s => new SkillItemModel
            {
                Id = s.Id,
                Name = s.Name,
                IconKey = s.IconKey,
                DisplayOrder = s.DisplayOrder
            }).ToList()
        };

    public static readonly Expression<Func<SkillCategory, SkillCategoryModel>> FromEntityWithoutSkills = entity =>
        new SkillCategoryModel
        {
            Id = entity.Id,
            NameFr = entity.NameFr,
            NameEn = entity.NameEn,
            DisplayOrder = entity.DisplayOrder
        };
}

public class SkillItemModel
{
    [JsonPropertyName("id")]
    public Guid Id { get; set; }

    [JsonPropertyName("name")]
    public required string Name { get; set; }

    [JsonPropertyName("iconKey")]
    public string? IconKey { get; set; }

    [JsonPropertyName("displayOrder")]
    public int DisplayOrder { get; set; }
}
