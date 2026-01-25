using Microsoft.EntityFrameworkCore;
using Portfolio.Core.Career;
using Portfolio.Infrastructure.Data;

namespace Portfolio.Infrastructure.Repositories;

public class EducationRepository(PortfolioDbContext context) : IEducationRepository
{
    public Task<Education?> GetOrDefaultAsync(Guid id, CancellationToken cancellationToken)
        => context.Educations.FirstOrDefaultAsync(e => e.Id == id, cancellationToken);

    public IQueryable<Education> GetAll()
        => context.Educations.AsNoTracking().OrderBy(e => e.DisplayOrder);

    public async Task AddAsync(Education education, CancellationToken cancellationToken)
        => await context.Educations.AddAsync(education, cancellationToken);

    public void Update(Education education)
        => context.Educations.Update(education);

    public void Delete(Education education)
        => context.Educations.Remove(education);
}
