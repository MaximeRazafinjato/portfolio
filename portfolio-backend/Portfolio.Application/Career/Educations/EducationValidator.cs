using Portfolio.Core.Common;

namespace Portfolio.Application.Career.Educations;

public class EducationValidator : IValidator<EducationModel>
{
    public Task<Result> ValidateAsync(EducationModel model, CancellationToken cancellationToken)
    {
        var errors = new List<string>();

        if (string.IsNullOrWhiteSpace(model.LocationFr))
            errors.Add("La localisation (FR) est requise");

        if (string.IsNullOrWhiteSpace(model.LocationEn))
            errors.Add("La localisation (EN) est requise");

        if (string.IsNullOrWhiteSpace(model.DescriptionFr))
            errors.Add("La description (FR) est requise");

        if (string.IsNullOrWhiteSpace(model.DescriptionEn))
            errors.Add("La description (EN) est requise");

        return Task.FromResult(errors.Count > 0 ? Result.Failure(errors) : Result.Success());
    }
}
