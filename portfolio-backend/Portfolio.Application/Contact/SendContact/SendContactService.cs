using Portfolio.Core.Common;
using Portfolio.Core.Contact;

namespace Portfolio.Application.Contact.SendContact;

public class SendContactService(
    IUnitOfWorkManager unitOfWorkManager,
    IContactMessageRepository repository,
    SendContactValidator validator) : IService
{
    public async Task<Result> ExecuteAsync(SendContactModel model, CancellationToken cancellationToken)
    {
        var validationResult = await validator.ValidateAsync(model, cancellationToken);
        if (!validationResult.IsSuccess)
            return validationResult;

        var message = new ContactMessage
        {
            Id = Guid.NewGuid(),
            Name = model.Name,
            Email = model.Email,
            Subject = model.Subject,
            Message = model.Message,
            IsRead = false
        };

        using (var uow = unitOfWorkManager.NewUnitOfWork())
        {
            await repository.AddAsync(message, cancellationToken);
            await uow.CommitAsync(cancellationToken);
        }

        return Result.Success();
    }
}
