using Portfolio.Core.Common;
using Portfolio.Core.Profile;

namespace Portfolio.Application.Profile.SocialLinks;

public class UpdateSocialLinkService(
    IUnitOfWorkManager unitOfWorkManager,
    ISocialLinkRepository repository,
    SocialLinkValidator validator) : IService
{
    public async Task<Result> ExecuteAsync(Guid id, SocialLinkModel model, CancellationToken cancellationToken)
    {
        var validationResult = await validator.ValidateAsync(model, cancellationToken);
        if (!validationResult.IsSuccess)
            return validationResult;

        var entity = await repository.GetOrDefaultAsync(id, cancellationToken);
        if (entity is null)
            return Result.Failure(["Lien social non trouvé"]);

        entity.Update(model.Platform, model.Url, model.DisplayOrder);

        using (var uow = unitOfWorkManager.NewUnitOfWork())
        {
            repository.Update(entity);
            await uow.CommitAsync(cancellationToken);
        }

        return Result.Success();
    }
}
