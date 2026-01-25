using Portfolio.Core.Common;
using Portfolio.Core.Portfolio;

namespace Portfolio.Application.Portfolio.SoftSkills;

public class DeleteSoftSkillService(
    IUnitOfWorkManager unitOfWorkManager,
    ISoftSkillRepository repository) : IService
{
    public async Task<Result> ExecuteAsync(Guid id, CancellationToken cancellationToken)
    {
        var entity = await repository.GetOrDefaultAsync(id, cancellationToken);
        if (entity is null)
            return Result.Failure(["Soft skill non trouvé"]);

        using (var uow = unitOfWorkManager.NewUnitOfWork())
        {
            repository.Delete(entity);
            await uow.CommitAsync(cancellationToken);
        }

        return Result.Success();
    }
}
