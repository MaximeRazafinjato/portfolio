namespace Portfolio.Core.Portfolio;

public interface ISkillCategoryRepository
{
    Task<SkillCategory?> GetOrDefaultAsync(Guid id, CancellationToken cancellationToken);
    Task<SkillCategory?> GetOrDefaultWithSkillsAsync(Guid id, CancellationToken cancellationToken);
    IQueryable<SkillCategory> GetAll();
    IQueryable<SkillCategory> GetAllWithSkills();
    Task AddAsync(SkillCategory category, CancellationToken cancellationToken);
    void Update(SkillCategory category);
    void Delete(SkillCategory category);
}
