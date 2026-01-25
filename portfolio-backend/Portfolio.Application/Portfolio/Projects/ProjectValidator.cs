using Portfolio.Core.Common;

namespace Portfolio.Application.Portfolio.Projects;

public class ProjectValidator : IValidator<ProjectModel>
{
    public Task<Result> ValidateAsync(ProjectModel model, CancellationToken cancellationToken)
    {
        var errors = new List<string>();

        if (string.IsNullOrWhiteSpace(model.Name))
            errors.Add("Le nom est requis");

        if (string.IsNullOrWhiteSpace(model.DescriptionFr))
            errors.Add("La description (FR) est requise");

        if (string.IsNullOrWhiteSpace(model.DescriptionEn))
            errors.Add("La description (EN) est requise");

        return Task.FromResult(errors.Count > 0 ? Result.Failure(errors) : Result.Success());
    }
}
