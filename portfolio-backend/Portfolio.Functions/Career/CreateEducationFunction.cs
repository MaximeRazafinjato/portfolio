using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Portfolio.Application.Career.Educations;

namespace Portfolio.Functions.Career;

public class CreateEducationFunction(CreateEducationService service)
{
    [Function("CreateEducation")]
    public async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "education")] HttpRequest req,
        CancellationToken cancellationToken)
    {
        var model = await req.ReadFromJsonAsync<EducationModel>(cancellationToken);
        if (model is null)
            return new BadRequestObjectResult(new { errors = new[] { "Corps de requête invalide" } });

        var result = await service.ExecuteAsync(model, cancellationToken);

        if (!result.IsSuccess)
            return new BadRequestObjectResult(new { errors = result.Errors });

        return new CreatedResult($"/api/education/{result.Value}", new { id = result.Value });
    }
}
