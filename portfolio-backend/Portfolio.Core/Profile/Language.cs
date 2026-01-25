using System.Text.Json.Serialization;
using Portfolio.Core.Common;

namespace Portfolio.Core.Profile;

public class Language : BaseEntity
{
    public required string NameFr { get; set; }
    public required string NameEn { get; set; }
    public required LanguageLevel Level { get; set; }
    public int DisplayOrder { get; set; }

    public void Update(string nameFr, string nameEn, LanguageLevel level, int displayOrder)
    {
        NameFr = nameFr;
        NameEn = nameEn;
        Level = level;
        DisplayOrder = displayOrder;
    }
}

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum LanguageLevel
{
    Native = 0,
    Fluent = 1,
    Advanced = 2,
    Intermediate = 3,
    Basic = 4
}
