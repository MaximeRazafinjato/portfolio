using System.Text.RegularExpressions;
using Portfolio.Core.Common;

namespace Portfolio.Application.Contact.SendContact;

public partial class SendContactValidator : IValidator<SendContactModel>
{
    public Task<Result> ValidateAsync(SendContactModel model, CancellationToken cancellationToken)
    {
        var errors = new List<string>();

        if (string.IsNullOrWhiteSpace(model.Name))
            errors.Add("Le nom est requis");
        if (string.IsNullOrWhiteSpace(model.Email))
            errors.Add("L'email est requis");
        else if (!EmailRegex().IsMatch(model.Email))
            errors.Add("L'email n'est pas valide");
        if (string.IsNullOrWhiteSpace(model.Subject))
            errors.Add("Le sujet est requis");
        if (string.IsNullOrWhiteSpace(model.Message))
            errors.Add("Le message est requis");

        return Task.FromResult(errors.Count > 0 ? Result.Failure(errors) : Result.Success());
    }

    [GeneratedRegex(@"^[^@\s]+@[^@\s]+\.[^@\s]+$")]
    private static partial Regex EmailRegex();
}
