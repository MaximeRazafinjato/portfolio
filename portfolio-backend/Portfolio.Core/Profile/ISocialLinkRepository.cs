namespace Portfolio.Core.Profile;

public interface ISocialLinkRepository
{
    Task<SocialLink?> GetOrDefaultAsync(Guid id, CancellationToken cancellationToken);
    IQueryable<SocialLink> GetAll();
    Task AddAsync(SocialLink socialLink, CancellationToken cancellationToken);
    void Update(SocialLink socialLink);
    void Delete(SocialLink socialLink);
}
