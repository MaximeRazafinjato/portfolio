using Microsoft.EntityFrameworkCore;
using Portfolio.Core.Profile;
using Portfolio.Infrastructure.Data;

namespace Portfolio.Infrastructure.Repositories;

public class SocialLinkRepository(PortfolioDbContext context) : ISocialLinkRepository
{
    public Task<SocialLink?> GetOrDefaultAsync(Guid id, CancellationToken cancellationToken)
        => context.SocialLinks.FirstOrDefaultAsync(s => s.Id == id, cancellationToken);

    public IQueryable<SocialLink> GetAll()
        => context.SocialLinks.AsNoTracking().OrderBy(s => s.DisplayOrder);

    public async Task AddAsync(SocialLink socialLink, CancellationToken cancellationToken)
        => await context.SocialLinks.AddAsync(socialLink, cancellationToken);

    public void Update(SocialLink socialLink)
        => context.SocialLinks.Update(socialLink);

    public void Delete(SocialLink socialLink)
        => context.SocialLinks.Remove(socialLink);
}
