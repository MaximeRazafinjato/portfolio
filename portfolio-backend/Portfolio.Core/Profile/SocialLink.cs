using Portfolio.Core.Common;

namespace Portfolio.Core.Profile;

public class SocialLink : BaseEntity
{
    public required string Platform { get; set; }
    public required string Url { get; set; }
    public int DisplayOrder { get; set; }

    public void Update(string platform, string url, int displayOrder)
    {
        Platform = platform;
        Url = url;
        DisplayOrder = displayOrder;
    }
}
