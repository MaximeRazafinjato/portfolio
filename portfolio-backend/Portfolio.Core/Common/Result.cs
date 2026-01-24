namespace Portfolio.Core.Common;

public class Result
{
    public bool IsSuccess { get; protected init; }
    public List<string> Errors { get; protected init; } = [];

    protected Result() { }

    public static Result Success() => new() { IsSuccess = true };
    public static Result Failure(List<string> errors) => new() { IsSuccess = false, Errors = errors };
    public static Result Failure(string error) => new() { IsSuccess = false, Errors = [error] };
}

public class Result<T> : Result
{
    public T? Value { get; private init; }

    public static Result<T> Success(T value) => new() { IsSuccess = true, Value = value };
    public new static Result<T> Failure(List<string> errors) => new() { IsSuccess = false, Errors = errors };
    public new static Result<T> Failure(string error) => new() { IsSuccess = false, Errors = [error] };

    public static implicit operator Result<T>(T value) => Success(value);
}
