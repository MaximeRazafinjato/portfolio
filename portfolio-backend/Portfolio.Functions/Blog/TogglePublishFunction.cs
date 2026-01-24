using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Portfolio.Application.Blog.TogglePublish;

namespace Portfolio.Functions.Blog;

public class TogglePublishFunction(TogglePublishService service)
{
    [Function("TogglePublish")]
    public async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "patch", Route = "articles/{id:guid}/publish")] HttpRequest req,
        Guid id,
        CancellationToken cancellationToken)
    {
        var model = await req.ReadFromJsonAsync<TogglePublishModel>(cancellationToken);
        if (model is null)
            return new BadRequestObjectResult(new { errors = new[] { "Corps de requête invalide" } });

        var result = await service.ExecuteAsync(id, model, cancellationToken);

        if (!result.IsSuccess)
        {
            if (result.Errors.Exists(e => e.Contains("non trouvé")))
                return new NotFoundResult();
            return new BadRequestObjectResult(new { errors = result.Errors });
        }

        return new NoContentResult();
    }
}
