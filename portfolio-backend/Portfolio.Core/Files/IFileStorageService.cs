namespace Portfolio.Core.Files;

public interface IFileStorageService
{
    Task<string> UploadAsync(Stream stream, string fileName, string contentType, CancellationToken cancellationToken);
    Task DeleteAsync(string blobName, CancellationToken cancellationToken);
}
