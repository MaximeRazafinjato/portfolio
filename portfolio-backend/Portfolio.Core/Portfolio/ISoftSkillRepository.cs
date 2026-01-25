namespace Portfolio.Core.Portfolio;

public interface ISoftSkillRepository
{
    Task<SoftSkill?> GetOrDefaultAsync(Guid id, CancellationToken cancellationToken);
    IQueryable<SoftSkill> GetAll();
    Task AddAsync(SoftSkill softSkill, CancellationToken cancellationToken);
    void Update(SoftSkill softSkill);
    void Delete(SoftSkill softSkill);
}
