using Portfolio.Core.Common;

namespace Portfolio.Core.Profile;

public class PersonalInfo : BaseEntity
{
    public required string Name { get; set; }
    public required string TitleFr { get; set; }
    public required string TitleEn { get; set; }
    public required string Email { get; set; }
    public string? Phone { get; set; }
    public required string City { get; set; }
    public required string CountryFr { get; set; }
    public required string CountryEn { get; set; }
    public string? AvatarUrl { get; set; }
    public string? CvUrl { get; set; }

    public void Update(
        string name,
        string titleFr,
        string titleEn,
        string email,
        string? phone,
        string city,
        string countryFr,
        string countryEn,
        string? avatarUrl,
        string? cvUrl)
    {
        Name = name;
        TitleFr = titleFr;
        TitleEn = titleEn;
        Email = email;
        Phone = phone;
        City = city;
        CountryFr = countryFr;
        CountryEn = countryEn;
        AvatarUrl = avatarUrl;
        CvUrl = cvUrl;
    }
}
