using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Portfolio.Core.Blog;
using Portfolio.Core.Career;
using Portfolio.Core.Common;
using Portfolio.Core.Contact;
using Portfolio.Core.Files;
using Portfolio.Core.Portfolio;
using Portfolio.Core.Profile;
using Portfolio.Infrastructure.Data;
using Portfolio.Infrastructure.Files;
using Portfolio.Infrastructure.Repositories;

namespace Portfolio.Infrastructure;

public class DatabaseMigrationOptions
{
    public required string ConnectionString { get; init; }
}

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, string connectionString)
    {
        services.AddSingleton(new DatabaseMigrationOptions { ConnectionString = connectionString });
        services.AddDbContext<PortfolioDbContext>(options =>
            options.UseSqlServer(connectionString));

        services.AddScoped<IUnitOfWorkManager, UnitOfWorkManager>();

        services.AddScoped<IArticleRepository, ArticleRepository>();
        services.AddScoped<IContactMessageRepository, ContactMessageRepository>();

        services.AddScoped<IPersonalInfoRepository, PersonalInfoRepository>();
        services.AddScoped<ISocialLinkRepository, SocialLinkRepository>();
        services.AddScoped<ILanguageRepository, LanguageRepository>();

        services.AddScoped<IExperienceRepository, ExperienceRepository>();
        services.AddScoped<IEducationRepository, EducationRepository>();

        services.AddScoped<ISkillCategoryRepository, SkillCategoryRepository>();
        services.AddScoped<ISkillRepository, SkillRepository>();
        services.AddScoped<ISoftSkillRepository, SoftSkillRepository>();
        services.AddScoped<IProjectRepository, ProjectRepository>();

        services.AddSingleton<IFileStorageService, AzureBlobStorageService>();

        services.AddScoped<SeedDataService>();

        return services;
    }

    public static void ApplyMigrations(this IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<PortfolioDbContext>();
        dbContext.Database.Migrate();
    }
}
