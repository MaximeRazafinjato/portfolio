using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Portfolio.Application.Blog.DeleteArticle;

namespace Portfolio.Functions.Blog;

public class DeleteArticleFunction(DeleteArticleService service)
{
    [Function("DeleteArticle")]
    public async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Function, "delete", Route = "articles/{id:guid}")] HttpRequest req,
        Guid id,
        CancellationToken cancellationToken)
    {
        var result = await service.ExecuteAsync(id, cancellationToken);

        if (!result.IsSuccess)
        {
            if (result.Errors.Exists(e => e.Contains("non trouvé")))
                return new NotFoundResult();
            return new BadRequestObjectResult(new { errors = result.Errors });
        }

        return new NoContentResult();
    }
}
