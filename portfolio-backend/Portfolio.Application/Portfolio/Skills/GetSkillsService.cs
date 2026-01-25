using Microsoft.EntityFrameworkCore;
using Portfolio.Core.Common;
using Portfolio.Core.Portfolio;

namespace Portfolio.Application.Portfolio.Skills;

public class GetSkillsService(ISkillRepository repository) : IService
{
    public async Task<List<SkillModel>> ExecuteAsync(CancellationToken cancellationToken)
    {
        return await repository.GetAll()
            .Select(SkillModel.FromEntity)
            .ToListAsync(cancellationToken);
    }
}
