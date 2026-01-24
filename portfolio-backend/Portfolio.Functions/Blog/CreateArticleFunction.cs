using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Portfolio.Application.Blog.CreateArticle;

namespace Portfolio.Functions.Blog;

public class CreateArticleFunction(CreateArticleService service)
{
    [Function("CreateArticle")]
    public async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "articles")] HttpRequest req,
        CancellationToken cancellationToken)
    {
        var model = await req.ReadFromJsonAsync<CreateArticleModel>(cancellationToken);
        if (model is null)
            return new BadRequestObjectResult(new { errors = new[] { "Corps de requête invalide" } });

        var result = await service.ExecuteAsync(model, cancellationToken);

        if (!result.IsSuccess)
            return new BadRequestObjectResult(new { errors = result.Errors });

        return new CreatedResult($"/api/articles/{result.Value}", new { id = result.Value });
    }
}
