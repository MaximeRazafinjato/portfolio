using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Portfolio.Application.Portfolio.SoftSkills;

namespace Portfolio.Functions.Portfolio;

public class CreateSoftSkillFunction(CreateSoftSkillService service)
{
    [Function("CreateSoftSkill")]
    public async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "soft-skills")] HttpRequest req,
        CancellationToken cancellationToken)
    {
        var model = await req.ReadFromJsonAsync<SoftSkillModel>(cancellationToken);
        if (model is null)
            return new BadRequestObjectResult(new { errors = new[] { "Corps de requête invalide" } });

        var result = await service.ExecuteAsync(model, cancellationToken);

        if (!result.IsSuccess)
            return new BadRequestObjectResult(new { errors = result.Errors });

        return new CreatedResult($"/api/soft-skills/{result.Value}", new { id = result.Value });
    }
}
