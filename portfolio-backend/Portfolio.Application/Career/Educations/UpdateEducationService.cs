using Portfolio.Core.Career;
using Portfolio.Core.Common;

namespace Portfolio.Application.Career.Educations;

public class UpdateEducationService(
    IUnitOfWorkManager unitOfWorkManager,
    IEducationRepository repository,
    EducationValidator validator) : IService
{
    public async Task<Result> ExecuteAsync(Guid id, EducationModel model, CancellationToken cancellationToken)
    {
        var validationResult = await validator.ValidateAsync(model, cancellationToken);
        if (!validationResult.IsSuccess)
            return validationResult;

        var entity = await repository.GetOrDefaultAsync(id, cancellationToken);
        if (entity is null)
            return Result.Failure(["Formation non trouvée"]);

        entity.Update(
            model.PeriodStart,
            model.PeriodEnd,
            model.LocationFr,
            model.LocationEn,
            model.DescriptionFr,
            model.DescriptionEn,
            model.FlagEmoji,
            model.DisplayOrder);

        using (var uow = unitOfWorkManager.NewUnitOfWork())
        {
            repository.Update(entity);
            await uow.CommitAsync(cancellationToken);
        }

        return Result.Success();
    }
}
