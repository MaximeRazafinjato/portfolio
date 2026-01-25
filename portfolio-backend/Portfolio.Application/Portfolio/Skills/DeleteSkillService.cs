using Portfolio.Core.Common;
using Portfolio.Core.Portfolio;

namespace Portfolio.Application.Portfolio.Skills;

public class DeleteSkillService(
    IUnitOfWorkManager unitOfWorkManager,
    ISkillRepository repository) : IService
{
    public async Task<Result> ExecuteAsync(Guid id, CancellationToken cancellationToken)
    {
        var entity = await repository.GetOrDefaultAsync(id, cancellationToken);
        if (entity is null)
            return Result.Failure(["Compétence non trouvée"]);

        using (var uow = unitOfWorkManager.NewUnitOfWork())
        {
            repository.Delete(entity);
            await uow.CommitAsync(cancellationToken);
        }

        return Result.Success();
    }
}
