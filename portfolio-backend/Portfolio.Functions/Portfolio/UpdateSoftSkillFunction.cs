using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Portfolio.Application.Portfolio.SoftSkills;

namespace Portfolio.Functions.Portfolio;

public class UpdateSoftSkillFunction(UpdateSoftSkillService service)
{
    [Function("UpdateSoftSkill")]
    public async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "put", Route = "soft-skills/{id:guid}")] HttpRequest req,
        Guid id,
        CancellationToken cancellationToken)
    {
        var model = await req.ReadFromJsonAsync<SoftSkillModel>(cancellationToken);
        if (model is null)
            return new BadRequestObjectResult(new { errors = new[] { "Corps de requête invalide" } });

        var result = await service.ExecuteAsync(id, model, cancellationToken);

        if (!result.IsSuccess)
            return new BadRequestObjectResult(new { errors = result.Errors });

        return new OkResult();
    }
}
