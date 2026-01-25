namespace Portfolio.Core.Portfolio;

public interface ISkillRepository
{
    Task<Skill?> GetOrDefaultAsync(Guid id, CancellationToken cancellationToken);
    IQueryable<Skill> GetAll();
    IQueryable<Skill> GetByCategoryId(Guid categoryId);
    Task AddAsync(Skill skill, CancellationToken cancellationToken);
    void Update(Skill skill);
    void Delete(Skill skill);
}
