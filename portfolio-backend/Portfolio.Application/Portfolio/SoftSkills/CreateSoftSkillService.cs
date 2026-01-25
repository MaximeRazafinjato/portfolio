using Portfolio.Core.Common;
using Portfolio.Core.Portfolio;

namespace Portfolio.Application.Portfolio.SoftSkills;

public class CreateSoftSkillService(
    IUnitOfWorkManager unitOfWorkManager,
    ISoftSkillRepository repository,
    SoftSkillValidator validator) : IService
{
    public async Task<Result<Guid>> ExecuteAsync(SoftSkillModel model, CancellationToken cancellationToken)
    {
        var validationResult = await validator.ValidateAsync(model, cancellationToken);
        if (!validationResult.IsSuccess)
            return Result<Guid>.Failure(validationResult.Errors);

        var entity = new SoftSkill
        {
            Id = Guid.NewGuid(),
            NameFr = model.NameFr,
            NameEn = model.NameEn,
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
