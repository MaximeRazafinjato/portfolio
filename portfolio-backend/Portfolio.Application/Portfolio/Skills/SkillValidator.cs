using Portfolio.Core.Common;

namespace Portfolio.Application.Portfolio.Skills;

public class SkillValidator : IValidator<SkillModel>
{
    public Task<Result> ValidateAsync(SkillModel model, CancellationToken cancellationToken)
    {
        var errors = new List<string>();

        if (string.IsNullOrWhiteSpace(model.Name))
            errors.Add("Le nom est requis");

        if (model.CategoryId == Guid.Empty)
            errors.Add("La catégorie est requise");

        return Task.FromResult(errors.Count > 0 ? Result.Failure(errors) : Result.Success());
    }
}
