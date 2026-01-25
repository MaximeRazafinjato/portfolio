using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Portfolio.Application.Portfolio.Skills;

namespace Portfolio.Functions.Portfolio;

public class DeleteSkillFunction(DeleteSkillService service)
{
    [Function("DeleteSkill")]
    public async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "delete", Route = "skills/{id:guid}")] HttpRequest req,
        Guid id,
        CancellationToken cancellationToken)
    {
        var result = await service.ExecuteAsync(id, cancellationToken);

        if (!result.IsSuccess)
            return new BadRequestObjectResult(new { errors = result.Errors });

        return new NoContentResult();
    }
}
