using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Portfolio.Core.Files;

namespace Portfolio.Functions.Files;

public class DeleteFileFunction(IFileStorageService storageService)
{
    [Function("DeleteFile")]
    public async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "delete", Route = "files/{blobName}")] HttpRequest req,
        string blobName,
        CancellationToken cancellationToken)
    {
        if (string.IsNullOrEmpty(blobName))
            return new BadRequestObjectResult(new { errors = new[] { "Nom du fichier requis" } });

        await storageService.DeleteAsync(blobName, cancellationToken);

        return new NoContentResult();
    }
}
