using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using Portfolio.Infrastructure.Data;
using System.Net;

namespace Portfolio.Functions.Admin;

public class SeedDataFunction(SeedDataService seedService, ILogger<SeedDataFunction> logger)
{
    [Function("SeedData")]
    public async Task<HttpResponseData> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "data/seed")] HttpRequestData req,
        CancellationToken cancellationToken)
    {
        logger.LogInformation("Starting database seed...");

        try
        {
            await seedService.SeedAllAsync(cancellationToken);

            logger.LogInformation("Database seed completed successfully");

            var response = req.CreateResponse(HttpStatusCode.OK);
            await response.WriteAsJsonAsync(new { message = "Seed completed successfully" }, cancellationToken);
            return response;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error during database seed");

            var response = req.CreateResponse(HttpStatusCode.InternalServerError);
            await response.WriteAsJsonAsync(new { error = "Seed failed", details = ex.Message }, cancellationToken);
            return response;
        }
    }
}
