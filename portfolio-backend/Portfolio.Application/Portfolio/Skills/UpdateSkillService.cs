using Portfolio.Core.Common;
using Portfolio.Core.Portfolio;

namespace Portfolio.Application.Portfolio.Skills;

public class UpdateSkillService(
    IUnitOfWorkManager unitOfWorkManager,
    ISkillRepository repository,
    SkillValidator validator) : IService
{
    public async Task<Result> ExecuteAsync(Guid id, SkillModel model, CancellationToken cancellationToken)
    {
        var validationResult = await validator.ValidateAsync(model, cancellationToken);
        if (!validationResult.IsSuccess)
            return validationResult;

        var entity = await repository.GetOrDefaultAsync(id, cancellationToken);
        if (entity is null)
            return Result.Failure(["Compétence non trouvée"]);

        entity.Update(model.Name, model.CategoryId, model.IconKey, model.DisplayOrder);

        using (var uow = unitOfWorkManager.NewUnitOfWork())
        {
            repository.Update(entity);
            await uow.CommitAsync(cancellationToken);
        }

        return Result.Success();
    }
}
