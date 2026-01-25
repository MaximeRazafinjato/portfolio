using Microsoft.Extensions.DependencyInjection;
using Portfolio.Application.Blog.CreateArticle;
using Portfolio.Application.Blog.DeleteArticle;
using Portfolio.Application.Blog.GetArticleBySlug;
using Portfolio.Application.Blog.GetArticles;
using Portfolio.Application.Blog.TogglePublish;
using Portfolio.Application.Blog.UpdateArticle;
using Portfolio.Application.Career.Educations;
using Portfolio.Application.Career.Experiences;
using Portfolio.Application.Contact.SendContact;
using Portfolio.Application.Portfolio.Projects;
using Portfolio.Application.Portfolio.SkillCategories;
using Portfolio.Application.Portfolio.Skills;
using Portfolio.Application.Portfolio.SoftSkills;
using Portfolio.Application.Profile.Languages;
using Portfolio.Application.Profile.PersonalInfo;
using Portfolio.Application.Profile.SocialLinks;

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

        services.AddScoped<TogglePublishService>();

        services.AddScoped<GetArticlesService>();
        services.AddScoped<GetArticleBySlugService>();

        services.AddScoped<SendContactValidator>();
        services.AddScoped<SendContactService>();

        services.AddScoped<PersonalInfoValidator>();
        services.AddScoped<GetPersonalInfoService>();
        services.AddScoped<UpsertPersonalInfoService>();

        services.AddScoped<SocialLinkValidator>();
        services.AddScoped<GetSocialLinksService>();
        services.AddScoped<CreateSocialLinkService>();
        services.AddScoped<UpdateSocialLinkService>();
        services.AddScoped<DeleteSocialLinkService>();

        services.AddScoped<LanguageValidator>();
        services.AddScoped<GetLanguagesService>();
        services.AddScoped<CreateLanguageService>();
        services.AddScoped<UpdateLanguageService>();
        services.AddScoped<DeleteLanguageService>();

        services.AddScoped<ExperienceValidator>();
        services.AddScoped<GetExperiencesService>();
        services.AddScoped<CreateExperienceService>();
        services.AddScoped<UpdateExperienceService>();
        services.AddScoped<DeleteExperienceService>();

        services.AddScoped<EducationValidator>();
        services.AddScoped<GetEducationsService>();
        services.AddScoped<CreateEducationService>();
        services.AddScoped<UpdateEducationService>();
        services.AddScoped<DeleteEducationService>();

        services.AddScoped<SkillCategoryValidator>();
        services.AddScoped<GetSkillCategoriesService>();
        services.AddScoped<CreateSkillCategoryService>();
        services.AddScoped<UpdateSkillCategoryService>();
        services.AddScoped<DeleteSkillCategoryService>();

        services.AddScoped<SkillValidator>();
        services.AddScoped<GetSkillsService>();
        services.AddScoped<CreateSkillService>();
        services.AddScoped<UpdateSkillService>();
        services.AddScoped<DeleteSkillService>();

        services.AddScoped<SoftSkillValidator>();
        services.AddScoped<GetSoftSkillsService>();
        services.AddScoped<CreateSoftSkillService>();
        services.AddScoped<UpdateSoftSkillService>();
        services.AddScoped<DeleteSoftSkillService>();

        services.AddScoped<ProjectValidator>();
        services.AddScoped<GetProjectsService>();
        services.AddScoped<CreateProjectService>();
        services.AddScoped<UpdateProjectService>();
        services.AddScoped<DeleteProjectService>();

        return services;
    }
}
