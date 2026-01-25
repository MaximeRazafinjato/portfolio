using Portfolio.Core.Common;

namespace Portfolio.Application.Career.Experiences;

public class ExperienceValidator : IValidator<ExperienceModel>
{
    public Task<Result> ValidateAsync(ExperienceModel model, CancellationToken cancellationToken)
    {
        var errors = new List<string>();

        if (string.IsNullOrWhiteSpace(model.CompanyName))
            errors.Add("Le nom de l'entreprise est requis");

        if (string.IsNullOrWhiteSpace(model.PositionFr))
            errors.Add("Le poste (FR) est requis");

        if (string.IsNullOrWhiteSpace(model.PositionEn))
            errors.Add("Le poste (EN) est requis");

        if (string.IsNullOrWhiteSpace(model.LocationFr))
            errors.Add("La localisation (FR) est requise");

        if (string.IsNullOrWhiteSpace(model.LocationEn))
            errors.Add("La localisation (EN) est requise");

        return Task.FromResult(errors.Count > 0 ? Result.Failure(errors) : Result.Success());
    }
}
