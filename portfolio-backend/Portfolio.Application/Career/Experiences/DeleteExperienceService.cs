using Portfolio.Core.Career;
using Portfolio.Core.Common;

namespace Portfolio.Application.Career.Experiences;

public class DeleteExperienceService(
    IUnitOfWorkManager unitOfWorkManager,
    IExperienceRepository repository) : IService
{
    public async Task<Result> ExecuteAsync(Guid id, CancellationToken cancellationToken)
    {
        var entity = await repository.GetOrDefaultAsync(id, cancellationToken);
        if (entity is null)
            return Result.Failure(["Expérience non trouvée"]);

        using (var uow = unitOfWorkManager.NewUnitOfWork())
        {
            repository.Delete(entity);
            await uow.CommitAsync(cancellationToken);
        }

        return Result.Success();
    }
}
