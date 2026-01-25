using Portfolio.Core.Common;
using Portfolio.Core.Portfolio;

namespace Portfolio.Application.Portfolio.Projects;

public class UpdateProjectService(
    IUnitOfWorkManager unitOfWorkManager,
    IProjectRepository repository,
    ProjectValidator validator) : IService
{
    public async Task<Result> ExecuteAsync(Guid id, ProjectModel model, CancellationToken cancellationToken)
    {
        var validationResult = await validator.ValidateAsync(model, cancellationToken);
        if (!validationResult.IsSuccess)
            return validationResult;

        var entity = await repository.GetOrDefaultAsync(id, cancellationToken);
        if (entity is null)
            return Result.Failure(["Projet non trouvé"]);

        entity.Update(
            model.Name,
            model.DescriptionFr,
            model.DescriptionEn,
            model.Technologies,
            model.GithubUrl,
            model.DemoUrl,
            model.ImageUrl,
            model.FeaturesFr,
            model.FeaturesEn,
            model.DisplayOrder);

        using (var uow = unitOfWorkManager.NewUnitOfWork())
        {
            repository.Update(entity);
            await uow.CommitAsync(cancellationToken);
        }

        return Result.Success();
    }
}
