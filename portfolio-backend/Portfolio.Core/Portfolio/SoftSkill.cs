using Portfolio.Core.Common;

namespace Portfolio.Core.Portfolio;

public class SoftSkill : BaseEntity
{
    public required string NameFr { get; set; }
    public required string NameEn { get; set; }
    public int DisplayOrder { get; set; }

    public void Update(string nameFr, string nameEn, int displayOrder)
    {
        NameFr = nameFr;
        NameEn = nameEn;
        DisplayOrder = displayOrder;
    }
}
