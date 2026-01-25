using Portfolio.Core.Common;
using Portfolio.Core.Profile;

namespace Portfolio.Application.Profile.PersonalInfo;

public class UpsertPersonalInfoService(
    IUnitOfWorkManager unitOfWorkManager,
    IPersonalInfoRepository repository,
    PersonalInfoValidator validator) : IService
{
    public async Task<Result<Guid>> ExecuteAsync(PersonalInfoModel model, CancellationToken cancellationToken)
    {
        var validationResult = await validator.ValidateAsync(model, cancellationToken);
        if (!validationResult.IsSuccess)
            return Result<Guid>.Failure(validationResult.Errors);

        var existing = await repository.GetAsync(cancellationToken);

        using (var uow = unitOfWorkManager.NewUnitOfWork())
        {
            if (existing is not null)
            {
                existing.Update(
                    model.Name,
                    model.TitleFr,
                    model.TitleEn,
                    model.Email,
                    model.Phone,
                    model.City,
                    model.CountryFr,
                    model.CountryEn,
                    model.AvatarUrl,
                    model.CvUrl);

                repository.Update(existing);
                await uow.CommitAsync(cancellationToken);
                return Result<Guid>.Success(existing.Id);
            }

            var entity = new Core.Profile.PersonalInfo
            {
                Id = Guid.NewGuid(),
                Name = model.Name,
                TitleFr = model.TitleFr,
                TitleEn = model.TitleEn,
                Email = model.Email,
                Phone = model.Phone,
                City = model.City,
                CountryFr = model.CountryFr,
                CountryEn = model.CountryEn,
                AvatarUrl = model.AvatarUrl,
                CvUrl = model.CvUrl
            };

            await repository.AddAsync(entity, cancellationToken);
            await uow.CommitAsync(cancellationToken);
            return Result<Guid>.Success(entity.Id);
        }
    }
}
