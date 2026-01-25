using Portfolio.Core.Common;

namespace Portfolio.Core.Career;

public class Education : BaseEntity
{
    public required DateTimeOffset PeriodStart { get; set; }
    public DateTimeOffset? PeriodEnd { get; set; }
    public required string LocationFr { get; set; }
    public required string LocationEn { get; set; }
    public required string DescriptionFr { get; set; }
    public required string DescriptionEn { get; set; }
    public string? FlagEmoji { get; set; }
    public int DisplayOrder { get; set; }

    public void Update(
        DateTimeOffset periodStart,
        DateTimeOffset? periodEnd,
        string locationFr,
        string locationEn,
        string descriptionFr,
        string descriptionEn,
        string? flagEmoji,
        int displayOrder)
    {
        PeriodStart = periodStart;
        PeriodEnd = periodEnd;
        LocationFr = locationFr;
        LocationEn = locationEn;
        DescriptionFr = descriptionFr;
        DescriptionEn = descriptionEn;
        FlagEmoji = flagEmoji;
        DisplayOrder = displayOrder;
    }
}
