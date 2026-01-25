using Microsoft.EntityFrameworkCore;
using Portfolio.Core.Profile;
using Portfolio.Infrastructure.Data;

namespace Portfolio.Infrastructure.Repositories;

public class LanguageRepository(PortfolioDbContext context) : ILanguageRepository
{
    public Task<Language?> GetOrDefaultAsync(Guid id, CancellationToken cancellationToken)
        => context.Languages.FirstOrDefaultAsync(l => l.Id == id, cancellationToken);

    public IQueryable<Language> GetAll()
        => context.Languages.AsNoTracking().OrderBy(l => l.DisplayOrder);

    public async Task AddAsync(Language language, CancellationToken cancellationToken)
        => await context.Languages.AddAsync(language, cancellationToken);

    public void Update(Language language)
        => context.Languages.Update(language);

    public void Delete(Language language)
        => context.Languages.Remove(language);
}
