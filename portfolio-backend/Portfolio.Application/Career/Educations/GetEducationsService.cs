using Microsoft.EntityFrameworkCore;
using Portfolio.Core.Career;
using Portfolio.Core.Common;

namespace Portfolio.Application.Career.Educations;

public class GetEducationsService(IEducationRepository repository) : IService
{
    public async Task<List<EducationModel>> ExecuteAsync(CancellationToken cancellationToken)
    {
        return await repository.GetAll()
            .Select(EducationModel.FromEntity)
            .ToListAsync(cancellationToken);
    }
}
