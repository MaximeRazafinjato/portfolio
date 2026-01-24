using Portfolio.Core.Common;

namespace Portfolio.Core.Contact;

public class ContactMessage : BaseEntity
{
    public required string Name { get; set; }
    public required string Email { get; set; }
    public required string Subject { get; set; }
    public required string Message { get; set; }
    public bool IsRead { get; set; }

    public void MarkAsRead()
    {
        IsRead = true;
        UpdatedAt = DateTimeOffset.UtcNow;
    }
}
