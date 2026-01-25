using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Portfolio.Application.Profile.SocialLinks;

namespace Portfolio.Functions.Profile;

public class CreateSocialLinkFunction(CreateSocialLinkService service)
{
    [Function("CreateSocialLink")]
    public async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "social-links")] HttpRequest req,
        CancellationToken cancellationToken)
    {
        var model = await req.ReadFromJsonAsync<SocialLinkModel>(cancellationToken);
        if (model is null)
            return new BadRequestObjectResult(new { errors = new[] { "Corps de requête invalide" } });

        var result = await service.ExecuteAsync(model, cancellationToken);

        if (!result.IsSuccess)
            return new BadRequestObjectResult(new { errors = result.Errors });

        return new CreatedResult($"/api/social-links/{result.Value}", new { id = result.Value });
    }
}
