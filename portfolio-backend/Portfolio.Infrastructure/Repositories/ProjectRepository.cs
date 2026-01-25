using Microsoft.EntityFrameworkCore;
using Portfolio.Core.Portfolio;
using Portfolio.Infrastructure.Data;

namespace Portfolio.Infrastructure.Repositories;

public class ProjectRepository(PortfolioDbContext context) : IProjectRepository
{
    public Task<Project?> GetOrDefaultAsync(Guid id, CancellationToken cancellationToken)
        => context.Projects.FirstOrDefaultAsync(p => p.Id == id, cancellationToken);

    public IQueryable<Project> GetAll()
        => context.Projects.AsNoTracking().OrderBy(p => p.DisplayOrder);

    public async Task AddAsync(Project project, CancellationToken cancellationToken)
        => await context.Projects.AddAsync(project, cancellationToken);

    public void Update(Project project)
        => context.Projects.Update(project);

    public void Delete(Project project)
        => context.Projects.Remove(project);
}
