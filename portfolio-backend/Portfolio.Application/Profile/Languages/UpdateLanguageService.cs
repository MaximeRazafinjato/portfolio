using Portfolio.Core.Common;
using Portfolio.Core.Profile;

namespace Portfolio.Application.Profile.Languages;

public class UpdateLanguageService(
    IUnitOfWorkManager unitOfWorkManager,
    ILanguageRepository repository,
    LanguageValidator validator) : IService
{
    public async Task<Result> ExecuteAsync(Guid id, LanguageModel model, CancellationToken cancellationToken)
    {
        var validationResult = await validator.ValidateAsync(model, cancellationToken);
        if (!validationResult.IsSuccess)
            return validationResult;

        var entity = await repository.GetOrDefaultAsync(id, cancellationToken);
        if (entity is null)
            return Result.Failure(["Langue non trouvée"]);

        entity.Update(model.NameFr, model.NameEn, model.Level, model.DisplayOrder);

        using (var uow = unitOfWorkManager.NewUnitOfWork())
        {
            repository.Update(entity);
            await uow.CommitAsync(cancellationToken);
        }

        return Result.Success();
    }
}
