namespace Portfolio.Core.Contact;

public interface IContactMessageRepository
{
    Task AddAsync(ContactMessage message, CancellationToken cancellationToken);
}
