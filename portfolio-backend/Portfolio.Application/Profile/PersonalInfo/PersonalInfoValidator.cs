using Portfolio.Core.Common;

namespace Portfolio.Application.Profile.PersonalInfo;

public class PersonalInfoValidator : IValidator<PersonalInfoModel>
{
    public Task<Result> ValidateAsync(PersonalInfoModel model, CancellationToken cancellationToken)
    {
        var errors = new List<string>();

        if (string.IsNullOrWhiteSpace(model.Name))
            errors.Add("Le nom est requis");

        if (string.IsNullOrWhiteSpace(model.TitleFr))
            errors.Add("Le titre (FR) est requis");

        if (string.IsNullOrWhiteSpace(model.TitleEn))
            errors.Add("Le titre (EN) est requis");

        if (string.IsNullOrWhiteSpace(model.Email))
            errors.Add("L'email est requis");

        if (string.IsNullOrWhiteSpace(model.City))
            errors.Add("La ville est requise");

        if (string.IsNullOrWhiteSpace(model.CountryFr))
            errors.Add("Le pays (FR) est requis");

        if (string.IsNullOrWhiteSpace(model.CountryEn))
            errors.Add("Le pays (EN) est requis");

        return Task.FromResult(errors.Count > 0 ? Result.Failure(errors) : Result.Success());
    }
}
