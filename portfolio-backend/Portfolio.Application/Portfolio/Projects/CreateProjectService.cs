using Portfolio.Core.Common;
using Portfolio.Core.Portfolio;

namespace Portfolio.Application.Portfolio.Projects;

public class CreateProjectService(
    IUnitOfWorkManager unitOfWorkManager,
    IProjectRepository repository,
    ProjectValidator validator) : IService
{
    public async Task<Result<Guid>> ExecuteAsync(ProjectModel model, CancellationToken cancellationToken)
    {
        var validationResult = await validator.ValidateAsync(model, cancellationToken);
        if (!validationResult.IsSuccess)
            return Result<Guid>.Failure(validationResult.Errors);

        var entity = new Project
        {
            Id = Guid.NewGuid(),
            Name = model.Name,
            DescriptionFr = model.DescriptionFr,
            DescriptionEn = model.DescriptionEn,
            Technologies = string.Join(",", model.Technologies),
            GithubUrl = model.GithubUrl,
            DemoUrl = model.DemoUrl,
            ImageUrl = model.ImageUrl,
            FeaturesFr = System.Text.Json.JsonSerializer.Serialize(model.FeaturesFr),
            FeaturesEn = System.Text.Json.JsonSerializer.Serialize(model.FeaturesEn),
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
