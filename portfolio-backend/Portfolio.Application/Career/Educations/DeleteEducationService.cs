using Portfolio.Core.Career;
using Portfolio.Core.Common;

namespace Portfolio.Application.Career.Educations;

public class DeleteEducationService(
    IUnitOfWorkManager unitOfWorkManager,
    IEducationRepository repository) : IService
{
    public async Task<Result> ExecuteAsync(Guid id, CancellationToken cancellationToken)
    {
        var entity = await repository.GetOrDefaultAsync(id, cancellationToken);
        if (entity is null)
            return Result.Failure(["Formation non trouvée"]);

        using (var uow = unitOfWorkManager.NewUnitOfWork())
        {
            repository.Delete(entity);
            await uow.CommitAsync(cancellationToken);
        }

        return Result.Success();
    }
}
