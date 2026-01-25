using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Portfolio.Application.Portfolio.Skills;

namespace Portfolio.Functions.Portfolio;

public class UpdateSkillFunction(UpdateSkillService service)
{
    [Function("UpdateSkill")]
    public async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "put", Route = "skills/{id:guid}")] HttpRequest req,
        Guid id,
        CancellationToken cancellationToken)
    {
        var model = await req.ReadFromJsonAsync<SkillModel>(cancellationToken);
        if (model is null)
            return new BadRequestObjectResult(new { errors = new[] { "Corps de requête invalide" } });

        var result = await service.ExecuteAsync(id, model, cancellationToken);

        if (!result.IsSuccess)
            return new BadRequestObjectResult(new { errors = result.Errors });

        return new OkResult();
    }
}
