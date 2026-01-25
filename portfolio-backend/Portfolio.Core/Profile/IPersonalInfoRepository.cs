namespace Portfolio.Core.Profile;

public interface IPersonalInfoRepository
{
    Task<PersonalInfo?> GetAsync(CancellationToken cancellationToken);
    Task AddAsync(PersonalInfo personalInfo, CancellationToken cancellationToken);
    void Update(PersonalInfo personalInfo);
}
