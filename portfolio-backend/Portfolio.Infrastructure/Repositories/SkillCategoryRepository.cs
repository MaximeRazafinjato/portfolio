using Microsoft.EntityFrameworkCore;
using Portfolio.Core.Portfolio;
using Portfolio.Infrastructure.Data;

namespace Portfolio.Infrastructure.Repositories;

public class SkillCategoryRepository(PortfolioDbContext context) : ISkillCategoryRepository
{
    public Task<SkillCategory?> GetOrDefaultAsync(Guid id, CancellationToken cancellationToken)
        => context.SkillCategories.FirstOrDefaultAsync(c => c.Id == id, cancellationToken);

    public Task<SkillCategory?> GetOrDefaultWithSkillsAsync(Guid id, CancellationToken cancellationToken)
        => context.SkillCategories
            .Include(c => c.Skills.OrderBy(s => s.DisplayOrder))
            .FirstOrDefaultAsync(c => c.Id == id, cancellationToken);

    public IQueryable<SkillCategory> GetAll()
        => context.SkillCategories.AsNoTracking().OrderBy(c => c.DisplayOrder);

    public IQueryable<SkillCategory> GetAllWithSkills()
        => context.SkillCategories
            .AsNoTracking()
            .Include(c => c.Skills.OrderBy(s => s.DisplayOrder))
            .OrderBy(c => c.DisplayOrder);

    public async Task AddAsync(SkillCategory category, CancellationToken cancellationToken)
        => await context.SkillCategories.AddAsync(category, cancellationToken);

    public void Update(SkillCategory category)
        => context.SkillCategories.Update(category);

    public void Delete(SkillCategory category)
        => context.SkillCategories.Remove(category);
}
