using Microsoft.EntityFrameworkCore;
using Portfolio.Core.Common;
using Portfolio.Core.Portfolio;

namespace Portfolio.Application.Portfolio.SkillCategories;

public class GetSkillCategoriesService(ISkillCategoryRepository repository) : IService
{
    public async Task<List<SkillCategoryModel>> ExecuteAsync(bool includeSkills, CancellationToken cancellationToken)
    {
        if (includeSkills)
        {
            return await repository.GetAllWithSkills()
                .Select(SkillCategoryModel.FromEntity)
                .ToListAsync(cancellationToken);
        }

        return await repository.GetAll()
            .Select(SkillCategoryModel.FromEntityWithoutSkills)
            .ToListAsync(cancellationToken);
    }
}
