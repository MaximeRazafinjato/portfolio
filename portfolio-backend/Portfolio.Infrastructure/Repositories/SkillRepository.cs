using Microsoft.EntityFrameworkCore;
using Portfolio.Core.Portfolio;
using Portfolio.Infrastructure.Data;

namespace Portfolio.Infrastructure.Repositories;

public class SkillRepository(PortfolioDbContext context) : ISkillRepository
{
    public Task<Skill?> GetOrDefaultAsync(Guid id, CancellationToken cancellationToken)
        => context.Skills.FirstOrDefaultAsync(s => s.Id == id, cancellationToken);

    public IQueryable<Skill> GetAll()
        => context.Skills.AsNoTracking().OrderBy(s => s.DisplayOrder);

    public IQueryable<Skill> GetByCategoryId(Guid categoryId)
        => context.Skills.AsNoTracking().Where(s => s.CategoryId == categoryId).OrderBy(s => s.DisplayOrder);

    public async Task AddAsync(Skill skill, CancellationToken cancellationToken)
        => await context.Skills.AddAsync(skill, cancellationToken);

    public void Update(Skill skill)
        => context.Skills.Update(skill);

    public void Delete(Skill skill)
        => context.Skills.Remove(skill);
}
