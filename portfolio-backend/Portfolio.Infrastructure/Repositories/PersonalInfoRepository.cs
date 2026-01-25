using Microsoft.EntityFrameworkCore;
using Portfolio.Core.Profile;
using Portfolio.Infrastructure.Data;

namespace Portfolio.Infrastructure.Repositories;

public class PersonalInfoRepository(PortfolioDbContext context) : IPersonalInfoRepository
{
    public Task<PersonalInfo?> GetAsync(CancellationToken cancellationToken)
        => context.PersonalInfos.FirstOrDefaultAsync(cancellationToken);

    public async Task AddAsync(PersonalInfo personalInfo, CancellationToken cancellationToken)
        => await context.PersonalInfos.AddAsync(personalInfo, cancellationToken);

    public void Update(PersonalInfo personalInfo)
        => context.PersonalInfos.Update(personalInfo);
}
