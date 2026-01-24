using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Portfolio.Application.Contact.SendContact;

namespace Portfolio.Functions.Contact;

public class SendContactFunction(SendContactService service)
{
    [Function("SendContact")]
    public async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "contact")] HttpRequest req,
        CancellationToken cancellationToken)
    {
        var model = await req.ReadFromJsonAsync<SendContactModel>(cancellationToken);
        if (model is null)
            return new BadRequestObjectResult(new { errors = new[] { "Corps de requête invalide" } });

        var result = await service.ExecuteAsync(model, cancellationToken);

        if (!result.IsSuccess)
            return new BadRequestObjectResult(new { errors = result.Errors });

        return new OkObjectResult(new { message = "Message envoyé avec succès" });
    }
}
