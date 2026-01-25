using Portfolio.Core.Common;

namespace Portfolio.Core.Portfolio;

public class Skill : BaseEntity
{
    public required string Name { get; set; }
    public required Guid CategoryId { get; set; }
    public string? IconKey { get; set; }
    public int DisplayOrder { get; set; }

    public virtual SkillCategory? Category { get; set; }

    public void Update(string name, Guid categoryId, string? iconKey, int displayOrder)
    {
        Name = name;
        CategoryId = categoryId;
        IconKey = iconKey;
        DisplayOrder = displayOrder;
    }
}
