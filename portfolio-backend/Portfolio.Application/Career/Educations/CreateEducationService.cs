using Portfolio.Core.Career;
using Portfolio.Core.Common;

namespace Portfolio.Application.Career.Educations;

public class CreateEducationService(
    IUnitOfWorkManager unitOfWorkManager,
    IEducationRepository repository,
    EducationValidator validator) : IService
{
    public async Task<Result<Guid>> ExecuteAsync(EducationModel model, CancellationToken cancellationToken)
    {
        var validationResult = await validator.ValidateAsync(model, cancellationToken);
        if (!validationResult.IsSuccess)
            return Result<Guid>.Failure(validationResult.Errors);

        var entity = new Education
        {
            Id = Guid.NewGuid(),
            PeriodStart = model.PeriodStart,
            PeriodEnd = model.PeriodEnd,
            LocationFr = model.LocationFr,
            LocationEn = model.LocationEn,
            DescriptionFr = model.DescriptionFr,
            DescriptionEn = model.DescriptionEn,
            FlagEmoji = model.FlagEmoji,
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
