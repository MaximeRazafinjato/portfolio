using System.Linq.Expressions;
using System.Text.Json.Serialization;
using Portfolio.Core.Portfolio;

namespace Portfolio.Application.Portfolio.SoftSkills;

public class SoftSkillModel
{
    [JsonPropertyName("id")]
    public Guid? Id { get; set; }

    [JsonPropertyName("nameFr")]
    public required string NameFr { get; set; }

    [JsonPropertyName("nameEn")]
    public required string NameEn { get; set; }

    [JsonPropertyName("displayOrder")]
    public int DisplayOrder { get; set; }

    public static readonly Expression<Func<SoftSkill, SoftSkillModel>> FromEntity = entity =>
        new SoftSkillModel
        {
            Id = entity.Id,
            NameFr = entity.NameFr,
            NameEn = entity.NameEn,
            DisplayOrder = entity.DisplayOrder
        };
}
