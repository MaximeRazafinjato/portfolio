using Portfolio.Core.Common;

namespace Portfolio.Core.Career;

public class Experience : BaseEntity
{
    public required string CompanyName { get; set; }
    public required string PositionFr { get; set; }
    public required string PositionEn { get; set; }
    public required DateTimeOffset PeriodStart { get; set; }
    public DateTimeOffset? PeriodEnd { get; set; }
    public bool IsCurrent { get; set; }
    public required string LocationFr { get; set; }
    public required string LocationEn { get; set; }
    public required string Technologies { get; set; }
    public required string ResponsibilitiesFr { get; set; }
    public required string ResponsibilitiesEn { get; set; }
    public int DisplayOrder { get; set; }

    public string[] GetTechnologies() => string.IsNullOrEmpty(Technologies)
        ? []
        : Technologies.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

    public void SetTechnologies(string[] technologies) => Technologies = string.Join(",", technologies);

    public string[] GetResponsibilitiesFr() => string.IsNullOrEmpty(ResponsibilitiesFr)
        ? []
        : System.Text.Json.JsonSerializer.Deserialize<string[]>(ResponsibilitiesFr) ?? [];

    public void SetResponsibilitiesFr(string[] responsibilities) =>
        ResponsibilitiesFr = System.Text.Json.JsonSerializer.Serialize(responsibilities);

    public string[] GetResponsibilitiesEn() => string.IsNullOrEmpty(ResponsibilitiesEn)
        ? []
        : System.Text.Json.JsonSerializer.Deserialize<string[]>(ResponsibilitiesEn) ?? [];

    public void SetResponsibilitiesEn(string[] responsibilities) =>
        ResponsibilitiesEn = System.Text.Json.JsonSerializer.Serialize(responsibilities);

    public void Update(
        string companyName,
        string positionFr,
        string positionEn,
        DateTimeOffset periodStart,
        DateTimeOffset? periodEnd,
        bool isCurrent,
        string locationFr,
        string locationEn,
        string[] technologies,
        string[] responsibilitiesFr,
        string[] responsibilitiesEn,
        int displayOrder)
    {
        CompanyName = companyName;
        PositionFr = positionFr;
        PositionEn = positionEn;
        PeriodStart = periodStart;
        PeriodEnd = periodEnd;
        IsCurrent = isCurrent;
        LocationFr = locationFr;
        LocationEn = locationEn;
        SetTechnologies(technologies);
        SetResponsibilitiesFr(responsibilitiesFr);
        SetResponsibilitiesEn(responsibilitiesEn);
        DisplayOrder = displayOrder;
    }
}
