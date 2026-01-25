using Portfolio.Core.Common;
using Portfolio.Core.Profile;

namespace Portfolio.Application.Profile.Languages;

public class CreateLanguageService(
    IUnitOfWorkManager unitOfWorkManager,
    ILanguageRepository repository,
    LanguageValidator validator) : IService
{
    public async Task<Result<Guid>> ExecuteAsync(LanguageModel model, CancellationToken cancellationToken)
    {
        var validationResult = await validator.ValidateAsync(model, cancellationToken);
        if (!validationResult.IsSuccess)
            return Result<Guid>.Failure(validationResult.Errors);

        var entity = new Language
        {
            Id = Guid.NewGuid(),
            NameFr = model.NameFr,
            NameEn = model.NameEn,
            Level = model.Level,
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
