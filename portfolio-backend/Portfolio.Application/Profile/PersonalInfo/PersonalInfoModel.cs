using System.Linq.Expressions;
using System.Text.Json.Serialization;

namespace Portfolio.Application.Profile.PersonalInfo;

public class PersonalInfoModel
{
    [JsonPropertyName("id")]
    public Guid? Id { get; set; }

    [JsonPropertyName("name")]
    public required string Name { get; set; }

    [JsonPropertyName("titleFr")]
    public required string TitleFr { get; set; }

    [JsonPropertyName("titleEn")]
    public required string TitleEn { get; set; }

    [JsonPropertyName("email")]
    public required string Email { get; set; }

    [JsonPropertyName("phone")]
    public string? Phone { get; set; }

    [JsonPropertyName("city")]
    public required string City { get; set; }

    [JsonPropertyName("countryFr")]
    public required string CountryFr { get; set; }

    [JsonPropertyName("countryEn")]
    public required string CountryEn { get; set; }

    [JsonPropertyName("avatarUrl")]
    public string? AvatarUrl { get; set; }

    [JsonPropertyName("cvUrl")]
    public string? CvUrl { get; set; }

    public static readonly Expression<Func<Core.Profile.PersonalInfo, PersonalInfoModel>> FromEntity = entity =>
        new PersonalInfoModel
        {
            Id = entity.Id,
            Name = entity.Name,
            TitleFr = entity.TitleFr,
            TitleEn = entity.TitleEn,
            Email = entity.Email,
            Phone = entity.Phone,
            City = entity.City,
            CountryFr = entity.CountryFr,
            CountryEn = entity.CountryEn,
            AvatarUrl = entity.AvatarUrl,
            CvUrl = entity.CvUrl
        };
}
