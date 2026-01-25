using Portfolio.Core.Common;

namespace Portfolio.Application.Portfolio.SoftSkills;

public class SoftSkillValidator : IValidator<SoftSkillModel>
{
    public Task<Result> ValidateAsync(SoftSkillModel model, CancellationToken cancellationToken)
    {
        var errors = new List<string>();

        if (string.IsNullOrWhiteSpace(model.NameFr))
            errors.Add("Le nom (FR) est requis");

        if (string.IsNullOrWhiteSpace(model.NameEn))
            errors.Add("Le nom (EN) est requis");

        return Task.FromResult(errors.Count > 0 ? Result.Failure(errors) : Result.Success());
    }
}
