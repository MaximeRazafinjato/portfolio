using Portfolio.Core.Common;

namespace Portfolio.Infrastructure.Data;

public class UnitOfWork(PortfolioDbContext context) : IUnitOfWork
{
    private bool _disposed;

    public async Task CommitAsync(CancellationToken cancellationToken)
    {
        await context.SaveChangesAsync(cancellationToken);
    }

    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }

    protected virtual void Dispose(bool disposing)
    {
        if (!_disposed && disposing)
        {
            _disposed = true;
        }
    }
}

public class UnitOfWorkManager(PortfolioDbContext context) : IUnitOfWorkManager
{
    public IUnitOfWork NewUnitOfWork() => new UnitOfWork(context);
}
