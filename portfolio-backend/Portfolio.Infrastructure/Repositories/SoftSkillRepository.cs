using Microsoft.EntityFrameworkCore;
using Portfolio.Core.Portfolio;
using Portfolio.Infrastructure.Data;

namespace Portfolio.Infrastructure.Repositories;

public class SoftSkillRepository(PortfolioDbContext context) : ISoftSkillRepository
{
    public Task<SoftSkill?> GetOrDefaultAsync(Guid id, CancellationToken cancellationToken)
        => context.SoftSkills.FirstOrDefaultAsync(s => s.Id == id, cancellationToken);

    public IQueryable<SoftSkill> GetAll()
        => context.SoftSkills.AsNoTracking().OrderBy(s => s.DisplayOrder);

    public async Task AddAsync(SoftSkill softSkill, CancellationToken cancellationToken)
        => await context.SoftSkills.AddAsync(softSkill, cancellationToken);

    public void Update(SoftSkill softSkill)
        => context.SoftSkills.Update(softSkill);

    public void Delete(SoftSkill softSkill)
        => context.SoftSkills.Remove(softSkill);
}
