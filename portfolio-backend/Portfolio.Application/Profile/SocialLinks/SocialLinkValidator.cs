using Portfolio.Core.Common;

namespace Portfolio.Application.Profile.SocialLinks;

public class SocialLinkValidator : IValidator<SocialLinkModel>
{
    public Task<Result> ValidateAsync(SocialLinkModel model, CancellationToken cancellationToken)
    {
        var errors = new List<string>();

        if (string.IsNullOrWhiteSpace(model.Platform))
            errors.Add("La plateforme est requise");

        if (string.IsNullOrWhiteSpace(model.Url))
            errors.Add("L'URL est requise");

        return Task.FromResult(errors.Count > 0 ? Result.Failure(errors) : Result.Success());
    }
}
