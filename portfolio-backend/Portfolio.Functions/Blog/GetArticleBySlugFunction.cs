using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Portfolio.Application.Blog.GetArticleBySlug;

namespace Portfolio.Functions.Blog;

public class GetArticleBySlugFunction(GetArticleBySlugService service)
{
    [Function("GetArticleBySlug")]
    public async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "articles/{slug}")] HttpRequest req,
        string slug,
        CancellationToken cancellationToken)
    {
        var article = await service.ExecuteAsync(slug, false, cancellationToken);

        if (article is null)
            return new NotFoundResult();

        return new OkObjectResult(article);
    }
}
