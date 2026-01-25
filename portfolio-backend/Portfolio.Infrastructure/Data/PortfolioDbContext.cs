using Microsoft.EntityFrameworkCore;
using Portfolio.Core.Blog;
using Portfolio.Core.Career;
using Portfolio.Core.Contact;
using Portfolio.Core.Portfolio;
using Portfolio.Core.Profile;

namespace Portfolio.Infrastructure.Data;

public class PortfolioDbContext(DbContextOptions<PortfolioDbContext> options) : DbContext(options)
{
    public DbSet<Article> Articles => Set<Article>();
    public DbSet<ContactMessage> ContactMessages => Set<ContactMessage>();
    public DbSet<PersonalInfo> PersonalInfos => Set<PersonalInfo>();
    public DbSet<SocialLink> SocialLinks => Set<SocialLink>();
    public DbSet<Language> Languages => Set<Language>();
    public DbSet<Experience> Experiences => Set<Experience>();
    public DbSet<Education> Educations => Set<Education>();
    public DbSet<SkillCategory> SkillCategories => Set<SkillCategory>();
    public DbSet<Skill> Skills => Set<Skill>();
    public DbSet<SoftSkill> SoftSkills => Set<SoftSkill>();
    public DbSet<Project> Projects => Set<Project>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Article>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title).HasMaxLength(200).IsRequired();
            entity.Property(e => e.TitleEn).HasMaxLength(200).IsRequired();
            entity.Property(e => e.Slug).HasMaxLength(200).IsRequired();
            entity.HasIndex(e => e.Slug).IsUnique();
            entity.Property(e => e.Content).IsRequired();
            entity.Property(e => e.ContentEn).IsRequired();
            entity.Property(e => e.Excerpt).HasMaxLength(500).IsRequired();
            entity.Property(e => e.ExcerptEn).HasMaxLength(500).IsRequired();
            entity.Property(e => e.CoverImageUrl).HasMaxLength(500);
            entity.Property(e => e.Tags).HasMaxLength(500).IsRequired();
        });

        modelBuilder.Entity<ContactMessage>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).HasMaxLength(100).IsRequired();
            entity.Property(e => e.Email).HasMaxLength(200).IsRequired();
            entity.Property(e => e.Subject).HasMaxLength(200).IsRequired();
            entity.Property(e => e.Message).IsRequired();
        });

        modelBuilder.Entity<PersonalInfo>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).HasMaxLength(100).IsRequired();
            entity.Property(e => e.TitleFr).HasMaxLength(200).IsRequired();
            entity.Property(e => e.TitleEn).HasMaxLength(200).IsRequired();
            entity.Property(e => e.Email).HasMaxLength(200).IsRequired();
            entity.Property(e => e.Phone).HasMaxLength(50);
            entity.Property(e => e.City).HasMaxLength(100).IsRequired();
            entity.Property(e => e.CountryFr).HasMaxLength(100).IsRequired();
            entity.Property(e => e.CountryEn).HasMaxLength(100).IsRequired();
            entity.Property(e => e.AvatarUrl).HasMaxLength(500);
            entity.Property(e => e.CvUrl).HasMaxLength(500);
        });

        modelBuilder.Entity<SocialLink>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Platform).HasMaxLength(50).IsRequired();
            entity.Property(e => e.Url).HasMaxLength(500).IsRequired();
        });

        modelBuilder.Entity<Language>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.NameFr).HasMaxLength(100).IsRequired();
            entity.Property(e => e.NameEn).HasMaxLength(100).IsRequired();
            entity.Property(e => e.Level).IsRequired();
        });

        modelBuilder.Entity<Experience>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.CompanyName).HasMaxLength(200).IsRequired();
            entity.Property(e => e.PositionFr).HasMaxLength(200).IsRequired();
            entity.Property(e => e.PositionEn).HasMaxLength(200).IsRequired();
            entity.Property(e => e.LocationFr).HasMaxLength(200).IsRequired();
            entity.Property(e => e.LocationEn).HasMaxLength(200).IsRequired();
            entity.Property(e => e.Technologies).HasMaxLength(1000).IsRequired();
            entity.Property(e => e.ResponsibilitiesFr).IsRequired();
            entity.Property(e => e.ResponsibilitiesEn).IsRequired();
        });

        modelBuilder.Entity<Education>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.LocationFr).HasMaxLength(200).IsRequired();
            entity.Property(e => e.LocationEn).HasMaxLength(200).IsRequired();
            entity.Property(e => e.DescriptionFr).HasMaxLength(500).IsRequired();
            entity.Property(e => e.DescriptionEn).HasMaxLength(500).IsRequired();
            entity.Property(e => e.FlagEmoji).HasMaxLength(10);
        });

        modelBuilder.Entity<SkillCategory>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.NameFr).HasMaxLength(100).IsRequired();
            entity.Property(e => e.NameEn).HasMaxLength(100).IsRequired();
            entity.HasMany(e => e.Skills)
                  .WithOne(s => s.Category)
                  .HasForeignKey(s => s.CategoryId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<Skill>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).HasMaxLength(100).IsRequired();
            entity.Property(e => e.IconKey).HasMaxLength(100);
        });

        modelBuilder.Entity<SoftSkill>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.NameFr).HasMaxLength(200).IsRequired();
            entity.Property(e => e.NameEn).HasMaxLength(200).IsRequired();
        });

        modelBuilder.Entity<Project>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).HasMaxLength(200).IsRequired();
            entity.Property(e => e.DescriptionFr).HasMaxLength(1000).IsRequired();
            entity.Property(e => e.DescriptionEn).HasMaxLength(1000).IsRequired();
            entity.Property(e => e.Technologies).HasMaxLength(500).IsRequired();
            entity.Property(e => e.GithubUrl).HasMaxLength(500);
            entity.Property(e => e.DemoUrl).HasMaxLength(500);
            entity.Property(e => e.ImageUrl).HasMaxLength(500);
            entity.Property(e => e.FeaturesFr).IsRequired();
            entity.Property(e => e.FeaturesEn).IsRequired();
        });
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        foreach (var entry in ChangeTracker.Entries<Core.Common.BaseEntity>())
        {
            switch (entry.State)
            {
                case EntityState.Added:
                    entry.Entity.CreatedAt = DateTimeOffset.UtcNow;
                    break;
                case EntityState.Modified:
                    entry.Entity.UpdatedAt = DateTimeOffset.UtcNow;
                    break;
            }
        }

        return base.SaveChangesAsync(cancellationToken);
    }
}
