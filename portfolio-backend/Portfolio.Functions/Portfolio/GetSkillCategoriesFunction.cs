using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Portfolio.Application.Portfolio.SkillCategories;

namespace Portfolio.Functions.Portfolio;

public class GetSkillCategoriesFunction(GetSkillCategoriesService service)
{
    [Function("GetSkillCategories")]
    public async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "skill-categories")] HttpRequest req,
        CancellationToken cancellationToken)
    {
        var includeSkills = bool.TryParse(req.Query["includeSkills"], out var i) && i;
        var result = await service.ExecuteAsync(includeSkills, cancellationToken);
        return new OkObjectResult(result);
    }
}
