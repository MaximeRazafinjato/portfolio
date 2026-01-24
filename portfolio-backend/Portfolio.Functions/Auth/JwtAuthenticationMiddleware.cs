using Microsoft.AspNetCore.Http;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Middleware;

namespace Portfolio.Functions.Auth;

public class JwtAuthenticationMiddleware(IJwtValidationService jwtValidation) : IFunctionsWorkerMiddleware
{
    private static readonly HashSet<string> ProtectedFunctions = new(StringComparer.OrdinalIgnoreCase)
    {
        "CreateArticle",
        "UpdateArticle",
        "DeleteArticle"
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

            context.Items["User"] = principal;
        }

        await next(context);
    }
}
