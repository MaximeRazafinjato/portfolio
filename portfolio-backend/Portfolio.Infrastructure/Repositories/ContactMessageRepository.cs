using Portfolio.Core.Contact;
using Portfolio.Infrastructure.Data;

namespace Portfolio.Infrastructure.Repositories;

public class ContactMessageRepository(PortfolioDbContext context) : IContactMessageRepository
{
    public async Task AddAsync(ContactMessage message, CancellationToken cancellationToken)
        => await context.ContactMessages.AddAsync(message, cancellationToken);
}
