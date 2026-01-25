namespace Portfolio.Core.Portfolio;

public interface IProjectRepository
{
    Task<Project?> GetOrDefaultAsync(Guid id, CancellationToken cancellationToken);
    IQueryable<Project> GetAll();
    Task AddAsync(Project project, CancellationToken cancellationToken);
    void Update(Project project);
    void Delete(Project project);
}
