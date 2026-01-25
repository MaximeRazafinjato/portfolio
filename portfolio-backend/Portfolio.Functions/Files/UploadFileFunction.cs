using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Portfolio.Core.Files;

namespace Portfolio.Functions.Files;

public class UploadFileFunction(IFileStorageService storageService)
{
    private static readonly HashSet<string> AllowedContentTypes = new(StringComparer.OrdinalIgnoreCase)
    {
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
        "application/pdf"
    };

    private const long MaxFileSize = 10 * 1024 * 1024;

    [Function("UploadFile")]
    public async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "files/upload")] HttpRequest req,
        CancellationToken cancellationToken)
    {
        var form = await req.ReadFormAsync(cancellationToken);
        var file = form.Files.GetFile("file");

        if (file is null || file.Length == 0)
            return new BadRequestObjectResult(new { errors = new[] { "Aucun fichier fourni" } });

        if (file.Length > MaxFileSize)
            return new BadRequestObjectResult(new { errors = new[] { "Le fichier ne doit pas dépasser 10 Mo" } });

        if (!AllowedContentTypes.Contains(file.ContentType))
            return new BadRequestObjectResult(new { errors = new[] { "Type de fichier non autorisé" } });

        await using var stream = file.OpenReadStream();
        var url = await storageService.UploadAsync(stream, file.FileName, file.ContentType, cancellationToken);

        return new OkObjectResult(new { url });
    }
}
