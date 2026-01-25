namespace Portfolio.Core.Profile;

public interface ILanguageRepository
{
    Task<Language?> GetOrDefaultAsync(Guid id, CancellationToken cancellationToken);
    IQueryable<Language> GetAll();
    Task AddAsync(Language language, CancellationToken cancellationToken);
    void Update(Language language);
    void Delete(Language language);
}
