using Portfolio.Core.Common;
using Portfolio.Core.Portfolio;

namespace Portfolio.Application.Portfolio.Skills;

public class CreateSkillService(
    IUnitOfWorkManager unitOfWorkManager,
    ISkillRepository repository,
    SkillValidator validator) : IService
{
    public async Task<Result<Guid>> ExecuteAsync(SkillModel model, CancellationToken cancellationToken)
    {
        var validationResult = await validator.ValidateAsync(model, cancellationToken);
        if (!validationResult.IsSuccess)
            return Result<Guid>.Failure(validationResult.Errors);

        var entity = new Skill
        {
            Id = Guid.NewGuid(),
            Name = model.Name,
            CategoryId = model.CategoryId,
            IconKey = model.IconKey,
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
