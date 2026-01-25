using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Portfolio.Application.Career.Educations;

namespace Portfolio.Functions.Career;

public class GetEducationsFunction(GetEducationsService service)
{
    [Function("GetEducations")]
    public async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "education")] HttpRequest req,
        CancellationToken cancellationToken)
    {
        var result = await service.ExecuteAsync(cancellationToken);
        return new OkObjectResult(result);
    }
}
