using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Portfolio.Application.Portfolio.Skills;

namespace Portfolio.Functions.Portfolio;

public class GetSkillsFunction(GetSkillsService service)
{
    [Function("GetSkills")]
    public async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "skills")] HttpRequest req,
        CancellationToken cancellationToken)
    {
        var result = await service.ExecuteAsync(cancellationToken);
        return new OkObjectResult(result);
    }
}
