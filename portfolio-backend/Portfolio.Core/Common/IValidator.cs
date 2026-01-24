namespace Portfolio.Core.Common;

public interface IValidator;

public interface IValidator<TModel> : IValidator
{
    Task<Result> ValidateAsync(TModel model, CancellationToken cancellationToken);
}
