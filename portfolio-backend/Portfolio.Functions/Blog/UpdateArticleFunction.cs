using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Portfolio.Application.Blog.UpdateArticle;

namespace Portfolio.Functions.Blog;

public class UpdateArticleFunction(UpdateArticleService service)
{
    [Function("UpdateArticle")]
    public async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "put", Route = "articles/{id:guid}")] HttpRequest req,
        Guid id,
        CancellationToken cancellationToken)
    {
        var model = await req.ReadFromJsonAsync<UpdateArticleModel>(cancellationToken);
        if (model is null)
            return new BadRequestObjectResult(new { errors = new[] { "Corps de requête invalide" } });

        model.Id = id;
        var result = await service.ExecuteAsync(model, cancellationToken);

        if (!result.IsSuccess)
        {
            if (result.Errors.Exists(e => e.Contains("non trouvé")))
                return new NotFoundResult();
            return new BadRequestObjectResult(new { errors = result.Errors });
        }

        return new NoContentResult();
    }
}
