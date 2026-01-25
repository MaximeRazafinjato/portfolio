using Microsoft.EntityFrameworkCore;
using Portfolio.Core.Common;
using Portfolio.Core.Portfolio;

namespace Portfolio.Application.Portfolio.Projects;

public class GetProjectsService(IProjectRepository repository) : IService
{
    public async Task<List<ProjectModel>> ExecuteAsync(CancellationToken cancellationToken)
    {
        var entities = await repository.GetAll().ToListAsync(cancellationToken);
        return entities.Select(ProjectModel.FromEntity).ToList();
    }
}
