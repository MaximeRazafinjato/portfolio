using Portfolio.Core.Common;
using Portfolio.Core.Portfolio;

namespace Portfolio.Application.Portfolio.SoftSkills;

public class UpdateSoftSkillService(
    IUnitOfWorkManager unitOfWorkManager,
    ISoftSkillRepository repository,
    SoftSkillValidator validator) : IService
{
    public async Task<Result> ExecuteAsync(Guid id, SoftSkillModel model, CancellationToken cancellationToken)
    {
        var validationResult = await validator.ValidateAsync(model, cancellationToken);
        if (!validationResult.IsSuccess)
            return validationResult;

        var entity = await repository.GetOrDefaultAsync(id, cancellationToken);
        if (entity is null)
            return Result.Failure(["Soft skill non trouvé"]);

        entity.Update(model.NameFr, model.NameEn, model.DisplayOrder);

        using (var uow = unitOfWorkManager.NewUnitOfWork())
        {
            repository.Update(entity);
            await uow.CommitAsync(cancellationToken);
        }

        return Result.Success();
    }
}
