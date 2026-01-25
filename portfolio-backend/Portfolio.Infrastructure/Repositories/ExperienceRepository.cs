using Microsoft.EntityFrameworkCore;
using Portfolio.Core.Career;
using Portfolio.Infrastructure.Data;

namespace Portfolio.Infrastructure.Repositories;

public class ExperienceRepository(PortfolioDbContext context) : IExperienceRepository
{
    public Task<Experience?> GetOrDefaultAsync(Guid id, CancellationToken cancellationToken)
        => context.Experiences.FirstOrDefaultAsync(e => e.Id == id, cancellationToken);

    public IQueryable<Experience> GetAll()
        => context.Experiences.AsNoTracking().OrderBy(e => e.DisplayOrder);

    public async Task AddAsync(Experience experience, CancellationToken cancellationToken)
        => await context.Experiences.AddAsync(experience, cancellationToken);

    public void Update(Experience experience)
        => context.Experiences.Update(experience);

    public void Delete(Experience experience)
        => context.Experiences.Remove(experience);
}
