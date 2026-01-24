using Microsoft.AspNetCore.Http;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Middleware;
using Microsoft.Extensions.Logging;

namespace Portfolio.Functions.Auth;

public class ExceptionHandlingMiddleware(ILogger<ExceptionHandlingMiddleware> logger) : IFunctionsWorkerMiddleware
{
    public async Task Invoke(FunctionContext context, FunctionExecutionDelegate next)
    {
        try
        {
            await next(context);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Erreur non gérée dans {FunctionName}", context.FunctionDefinition.Name);

            var httpContext = context.GetHttpContext();
            if (httpContext is not null)
            {
                httpContext.Response.StatusCode = StatusCodes.Status500InternalServerError;
                httpContext.Response.ContentType = "application/json";

                var errorResponse = new
                {
                    error = "Erreur serveur",
                    message = ex.Message,
                    details = ex.InnerException?.Message,
                    stackTrace = ex.StackTrace
                };

                await httpContext.Response.WriteAsJsonAsync(errorResponse);
            }
        }
    }
}
