using Microsoft.EntityFrameworkCore;
using Portfolio.Core.Common;
using Portfolio.Core.Profile;

namespace Portfolio.Application.Profile.Languages;

public class GetLanguagesService(ILanguageRepository repository) : IService
{
    public async Task<List<LanguageModel>> ExecuteAsync(CancellationToken cancellationToken)
    {
        return await repository.GetAll()
            .Select(LanguageModel.FromEntity)
            .ToListAsync(cancellationToken);
    }
}
