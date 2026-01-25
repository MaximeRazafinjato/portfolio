using Portfolio.Core.Common;
using Portfolio.Core.Profile;

namespace Portfolio.Application.Profile.PersonalInfo;

public class GetPersonalInfoService(IPersonalInfoRepository repository) : IService
{
    public async Task<PersonalInfoModel?> ExecuteAsync(CancellationToken cancellationToken)
    {
        var entity = await repository.GetAsync(cancellationToken);
        if (entity is null)
            return null;

        return PersonalInfoModel.FromEntity.Compile()(entity);
    }
}
