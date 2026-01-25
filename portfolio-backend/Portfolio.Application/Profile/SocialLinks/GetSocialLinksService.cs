using Microsoft.EntityFrameworkCore;
using Portfolio.Core.Common;
using Portfolio.Core.Profile;

namespace Portfolio.Application.Profile.SocialLinks;

public class GetSocialLinksService(ISocialLinkRepository repository) : IService
{
    public async Task<List<SocialLinkModel>> ExecuteAsync(CancellationToken cancellationToken)
    {
        return await repository.GetAll()
            .Select(SocialLinkModel.FromEntity)
            .ToListAsync(cancellationToken);
    }
}
