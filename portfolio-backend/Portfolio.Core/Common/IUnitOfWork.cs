namespace Portfolio.Core.Common;

public interface IUnitOfWork : IDisposable
{
    Task CommitAsync(CancellationToken cancellationToken);
}

public interface IUnitOfWorkManager
{
    IUnitOfWork NewUnitOfWork();
}
