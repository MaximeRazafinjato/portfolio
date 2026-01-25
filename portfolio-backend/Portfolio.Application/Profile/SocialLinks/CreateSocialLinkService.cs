using Portfolio.Core.Common;
using Portfolio.Core.Profile;

namespace Portfolio.Application.Profile.SocialLinks;

public class CreateSocialLinkService(
    IUnitOfWorkManager unitOfWorkManager,
    ISocialLinkRepository repository,
    SocialLinkValidator validator) : IService
{
    public async Task<Result<Guid>> ExecuteAsync(SocialLinkModel model, CancellationToken cancellationToken)
    {
        var validationResult = await validator.ValidateAsync(model, cancellationToken);
        if (!validationResult.IsSuccess)
            return Result<Guid>.Failure(validationResult.Errors);

        var entity = new SocialLink
        {
            Id = Guid.NewGuid(),
            Platform = model.Platform,
            Url = model.Url,
            DisplayOrder = model.DisplayOrder
        };

        using (var uow = unitOfWorkManager.NewUnitOfWork())
        {
            await repository.AddAsync(entity, cancellationToken);
            await uow.CommitAsync(cancellationToken);
        }

        return Result<Guid>.Success(entity.Id);
    }
}
