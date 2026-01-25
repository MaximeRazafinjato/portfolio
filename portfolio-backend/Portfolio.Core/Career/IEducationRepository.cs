namespace Portfolio.Core.Career;

public interface IEducationRepository
{
    Task<Education?> GetOrDefaultAsync(Guid id, CancellationToken cancellationToken);
    IQueryable<Education> GetAll();
    Task AddAsync(Education education, CancellationToken cancellationToken);
    void Update(Education education);
    void Delete(Education education);
}
