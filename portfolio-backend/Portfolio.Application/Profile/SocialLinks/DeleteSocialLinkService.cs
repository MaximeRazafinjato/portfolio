using Portfolio.Core.Common;
using Portfolio.Core.Profile;

namespace Portfolio.Application.Profile.SocialLinks;

public class DeleteSocialLinkService(
    IUnitOfWorkManager unitOfWorkManager,
    ISocialLinkRepository repository) : IService
{
    public async Task<Result> ExecuteAsync(Guid id, CancellationToken cancellationToken)
    {
        var entity = await repository.GetOrDefaultAsync(id, cancellationToken);
        if (entity is null)
            return Result.Failure(["Lien social non trouvé"]);

        using (var uow = unitOfWorkManager.NewUnitOfWork())
        {
            repository.Delete(entity);
            await uow.CommitAsync(cancellationToken);
        }

        return Result.Success();
    }
}
