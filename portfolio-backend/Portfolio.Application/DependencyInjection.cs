using Microsoft.Extensions.DependencyInjection;
using Portfolio.Application.Blog.CreateArticle;
using Portfolio.Application.Blog.DeleteArticle;
using Portfolio.Application.Blog.GetArticleBySlug;
using Portfolio.Application.Blog.GetArticles;
using Portfolio.Application.Blog.UpdateArticle;
using Portfolio.Application.Contact.SendContact;

namespace Portfolio.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddScoped<CreateArticleValidator>();
        services.AddScoped<CreateArticleService>();

        services.AddScoped<UpdateArticleValidator>();
        services.AddScoped<UpdateArticleService>();

        services.AddScoped<DeleteArticleService>();

        services.AddScoped<GetArticlesService>();
        services.AddScoped<GetArticleBySlugService>();

        services.AddScoped<SendContactValidator>();
        services.AddScoped<SendContactService>();

        return services;
    }
}
