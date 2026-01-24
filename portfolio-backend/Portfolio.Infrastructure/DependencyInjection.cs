using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Portfolio.Core.Blog;
using Portfolio.Core.Common;
using Portfolio.Core.Contact;
using Portfolio.Infrastructure.Data;
using Portfolio.Infrastructure.Repositories;

namespace Portfolio.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, string connectionString)
    {
        services.AddDbContext<PortfolioDbContext>(options =>
            options.UseSqlServer(connectionString));

        services.AddScoped<IUnitOfWorkManager, UnitOfWorkManager>();
        services.AddScoped<IArticleRepository, ArticleRepository>();
        services.AddScoped<IContactMessageRepository, ContactMessageRepository>();

        return services;
    }
}
