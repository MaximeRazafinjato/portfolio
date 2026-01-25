using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Portfolio.Application.Career.Experiences;

namespace Portfolio.Functions.Career;

public class GetExperiencesFunction(GetExperiencesService service)
{
    [Function("GetExperiences")]
    public async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "experiences")] HttpRequest req,
        CancellationToken cancellationToken)
    {
        var result = await service.ExecuteAsync(cancellationToken);
        return new OkObjectResult(result);
    }
}
