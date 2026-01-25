using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Portfolio.Application.Profile.SocialLinks;

namespace Portfolio.Functions.Profile;

public class GetSocialLinksFunction(GetSocialLinksService service)
{
    [Function("GetSocialLinks")]
    public async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "social-links")] HttpRequest req,
        CancellationToken cancellationToken)
    {
        var result = await service.ExecuteAsync(cancellationToken);
        return new OkObjectResult(result);
    }
}
