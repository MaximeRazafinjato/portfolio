using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Portfolio.Application.Portfolio.SoftSkills;

namespace Portfolio.Functions.Portfolio;

public class GetSoftSkillsFunction(GetSoftSkillsService service)
{
    [Function("GetSoftSkills")]
    public async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "soft-skills")] HttpRequest req,
        CancellationToken cancellationToken)
    {
        var result = await service.ExecuteAsync(cancellationToken);
        return new OkObjectResult(result);
    }
}
