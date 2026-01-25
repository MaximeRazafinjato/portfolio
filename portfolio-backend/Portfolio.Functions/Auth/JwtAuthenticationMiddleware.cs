using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Middleware;
using Microsoft.Extensions.Configuration;

namespace Portfolio.Functions.Auth;

public class JwtAuthenticationMiddleware(IJwtValidationService jwtValidation, IConfiguration configuration) : IFunctionsWorkerMiddleware
{
    private const string EmailClaimNamespace = "https://cv-web-api/email";

    private static readonly HashSet<string> ProtectedFunctions = new(StringComparer.OrdinalIgnoreCase)
    {
        "CreateArticle",
        "UpdateArticle",
        "DeleteArticle",

        "UpsertPersonalInfo",

        "CreateSocialLink",
        "UpdateSocialLink",
        "DeleteSocialLink",

        "CreateLanguage",
        "UpdateLanguage",
        "DeleteLanguage",

        "CreateExperience",
        "UpdateExperience",
        "DeleteExperience",

        "CreateEducation",
        "UpdateEducation",
        "DeleteEducation",

        "CreateSkillCategory",
        "UpdateSkillCategory",
        "DeleteSkillCategory",

        "CreateSkill",
        "UpdateSkill",
        "DeleteSkill",

        "CreateSoftSkill",
        "UpdateSoftSkill",
        "DeleteSoftSkill",

        "CreateProject",
        "UpdateProject",
        "DeleteProject",

        "UploadFile",
        "DeleteFile"
    };

    public async Task Invoke(FunctionContext context, FunctionExecutionDelegate next)
    {
        var functionName = context.FunctionDefinition.Name;

        if (ProtectedFunctions.Contains(functionName))
        {
            var httpContext = context.GetHttpContext();
            if (httpContext is null)
            {
                await next(context);
                return;
            }

            var authHeader = httpContext.Request.Headers.Authorization.FirstOrDefault();

            if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase))
            {
                httpContext.Response.StatusCode = StatusCodes.Status401Unauthorized;
                await httpContext.Response.WriteAsJsonAsync(new { error = "Non autorisé" });
                return;
            }

            var token = authHeader["Bearer ".Length..].Trim();
            var principal = await jwtValidation.ValidateTokenAsync(token);

            if (principal is null)
            {
                httpContext.Response.StatusCode = StatusCodes.Status401Unauthorized;
                await httpContext.Response.WriteAsJsonAsync(new { error = "Non autorisé" });
                return;
            }

            var adminEmail = configuration["Auth0:AdminEmail"];
            if (!IsAdmin(principal, adminEmail))
            {
                httpContext.Response.StatusCode = StatusCodes.Status403Forbidden;
                await httpContext.Response.WriteAsJsonAsync(new { error = "Accès refusé" });
                return;
            }

            context.Items["User"] = principal;
        }

        await next(context);
    }

    private static bool IsAdmin(ClaimsPrincipal principal, string? adminEmail)
    {
        if (string.IsNullOrEmpty(adminEmail))
            return false;

        var email = principal.FindFirst(EmailClaimNamespace)?.Value
            ?? principal.FindFirst(ClaimTypes.Email)?.Value
            ?? principal.FindFirst("email")?.Value
            ?? principal.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress")?.Value
            ?? principal.FindFirst(c => c.Type.EndsWith("/email", StringComparison.OrdinalIgnoreCase))?.Value;

        return !string.IsNullOrEmpty(email) &&
               email.Equals(adminEmail, StringComparison.OrdinalIgnoreCase);
    }
}
