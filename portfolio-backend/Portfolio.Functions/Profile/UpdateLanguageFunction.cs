using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Portfolio.Application.Profile.Languages;

namespace Portfolio.Functions.Profile;

public class UpdateLanguageFunction(UpdateLanguageService service)
{
    [Function("UpdateLanguage")]
    public async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "put", Route = "languages/{id:guid}")] HttpRequest req,
        Guid id,
        CancellationToken cancellationToken)
    {
        var model = await req.ReadFromJsonAsync<LanguageModel>(cancellationToken);
        if (model is null)
            return new BadRequestObjectResult(new { errors = new[] { "Corps de requête invalide" } });

        var result = await service.ExecuteAsync(id, model, cancellationToken);

        if (!result.IsSuccess)
            return new BadRequestObjectResult(new { errors = result.Errors });

        return new OkResult();
    }
}
