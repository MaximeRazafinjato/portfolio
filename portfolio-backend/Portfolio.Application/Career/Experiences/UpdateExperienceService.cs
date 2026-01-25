using Portfolio.Core.Career;
using Portfolio.Core.Common;

namespace Portfolio.Application.Career.Experiences;

public class UpdateExperienceService(
    IUnitOfWorkManager unitOfWorkManager,
    IExperienceRepository repository,
    ExperienceValidator validator) : IService
{
    public async Task<Result> ExecuteAsync(Guid id, ExperienceModel model, CancellationToken cancellationToken)
    {
        var validationResult = await validator.ValidateAsync(model, cancellationToken);
        if (!validationResult.IsSuccess)
            return validationResult;

        var entity = await repository.GetOrDefaultAsync(id, cancellationToken);
        if (entity is null)
            return Result.Failure(["Expérience non trouvée"]);

        entity.Update(
            model.CompanyName,
            model.PositionFr,
            model.PositionEn,
            model.PeriodStart,
            model.PeriodEnd,
            model.IsCurrent,
            model.LocationFr,
            model.LocationEn,
            model.Technologies,
            model.ResponsibilitiesFr,
            model.ResponsibilitiesEn,
            model.DisplayOrder);

        using (var uow = unitOfWorkManager.NewUnitOfWork())
        {
            repository.Update(entity);
            await uow.CommitAsync(cancellationToken);
        }

        return Result.Success();
    }
}
