using Portfolio.Core.Common;
using Portfolio.Core.Portfolio;

namespace Portfolio.Application.Portfolio.SkillCategories;

public class CreateSkillCategoryService(
    IUnitOfWorkManager unitOfWorkManager,
    ISkillCategoryRepository repository,
    SkillCategoryValidator validator) : IService
{
    public async Task<Result<Guid>> ExecuteAsync(SkillCategoryModel model, CancellationToken cancellationToken)
    {
        var validationResult = await validator.ValidateAsync(model, cancellationToken);
        if (!validationResult.IsSuccess)
            return Result<Guid>.Failure(validationResult.Errors);

        var entity = new SkillCategory
        {
            Id = Guid.NewGuid(),
            NameFr = model.NameFr,
            NameEn = model.NameEn,
            DisplayOrder = model.DisplayOrder
        };

        using (var uow = unitOfWorkManager.NewUnitOfWork())
        {
            await repository.AddAsync(entity, cancellationToken);
            await uow.CommitAsync(cancellationToken);
        }

        return Result<Guid>.Success(entity.Id);
    }
}
