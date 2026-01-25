using Portfolio.Core.Career;
using Portfolio.Core.Common;

namespace Portfolio.Application.Career.Experiences;

public class CreateExperienceService(
    IUnitOfWorkManager unitOfWorkManager,
    IExperienceRepository repository,
    ExperienceValidator validator) : IService
{
    public async Task<Result<Guid>> ExecuteAsync(ExperienceModel model, CancellationToken cancellationToken)
    {
        var validationResult = await validator.ValidateAsync(model, cancellationToken);
        if (!validationResult.IsSuccess)
            return Result<Guid>.Failure(validationResult.Errors);

        var entity = new Experience
        {
            Id = Guid.NewGuid(),
            CompanyName = model.CompanyName,
            PositionFr = model.PositionFr,
            PositionEn = model.PositionEn,
            PeriodStart = model.PeriodStart,
            PeriodEnd = model.PeriodEnd,
            IsCurrent = model.IsCurrent,
            LocationFr = model.LocationFr,
            LocationEn = model.LocationEn,
            Technologies = string.Join(",", model.Technologies),
            ResponsibilitiesFr = System.Text.Json.JsonSerializer.Serialize(model.ResponsibilitiesFr),
            ResponsibilitiesEn = System.Text.Json.JsonSerializer.Serialize(model.ResponsibilitiesEn),
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
