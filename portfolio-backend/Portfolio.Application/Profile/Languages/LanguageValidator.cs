using Portfolio.Core.Common;

namespace Portfolio.Application.Profile.Languages;

public class LanguageValidator : IValidator<LanguageModel>
{
    public Task<Result> ValidateAsync(LanguageModel model, CancellationToken cancellationToken)
    {
        var errors = new List<string>();

        if (string.IsNullOrWhiteSpace(model.NameFr))
            errors.Add("Le nom (FR) est requis");

        if (string.IsNullOrWhiteSpace(model.NameEn))
            errors.Add("Le nom (EN) est requis");

        return Task.FromResult(errors.Count > 0 ? Result.Failure(errors) : Result.Success());
    }
}
