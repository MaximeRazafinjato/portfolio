namespace Portfolio.Core.Career;

public interface IExperienceRepository
{
    Task<Experience?> GetOrDefaultAsync(Guid id, CancellationToken cancellationToken);
    IQueryable<Experience> GetAll();
    Task AddAsync(Experience experience, CancellationToken cancellationToken);
    void Update(Experience experience);
    void Delete(Experience experience);
}
