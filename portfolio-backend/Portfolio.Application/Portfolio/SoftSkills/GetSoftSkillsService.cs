using Microsoft.EntityFrameworkCore;
using Portfolio.Core.Common;
using Portfolio.Core.Portfolio;

namespace Portfolio.Application.Portfolio.SoftSkills;

public class GetSoftSkillsService(ISoftSkillRepository repository) : IService
{
    public async Task<List<SoftSkillModel>> ExecuteAsync(CancellationToken cancellationToken)
    {
        return await repository.GetAll()
            .Select(SoftSkillModel.FromEntity)
            .ToListAsync(cancellationToken);
    }
}
