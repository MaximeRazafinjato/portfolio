using Microsoft.EntityFrameworkCore;
using Portfolio.Core.Career;
using Portfolio.Core.Common;

namespace Portfolio.Application.Career.Experiences;

public class GetExperiencesService(IExperienceRepository repository) : IService
{
    public async Task<List<ExperienceModel>> ExecuteAsync(CancellationToken cancellationToken)
    {
        var entities = await repository.GetAll().ToListAsync(cancellationToken);
        return entities.Select(ExperienceModel.FromEntity).ToList();
    }
}
