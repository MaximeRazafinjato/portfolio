using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Portfolio.Application.Blog.GetArticles;

namespace Portfolio.Functions.Blog;

public class GetArticlesFunction(GetArticlesService service)
{
    [Function("GetArticles")]
    public async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "articles")] HttpRequest req,
        CancellationToken cancellationToken)
    {
        var page = int.TryParse(req.Query["page"], out var p) ? p : 1;
        var pageSize = int.TryParse(req.Query["pageSize"], out var ps) ? Math.Min(ps, 50) : 10;

        var result = await service.ExecuteAsync(page, pageSize, cancellationToken);

        return new OkObjectResult(result);
    }
}
