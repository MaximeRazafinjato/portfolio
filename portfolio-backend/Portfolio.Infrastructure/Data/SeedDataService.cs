using Microsoft.EntityFrameworkCore;
using Portfolio.Core.Career;
using Portfolio.Core.Portfolio;
using Portfolio.Core.Profile;

namespace Portfolio.Infrastructure.Data;

public class SeedDataService(PortfolioDbContext context)
{
    public async Task SeedAllAsync(CancellationToken cancellationToken = default)
    {
        await SeedPersonalInfoAsync(cancellationToken);
        await SeedSocialLinksAsync(cancellationToken);
        await SeedLanguagesAsync(cancellationToken);
        await SeedEducationAsync(cancellationToken);
        await SeedExperiencesAsync(cancellationToken);
        await SeedSkillCategoriesAndSkillsAsync(cancellationToken);
        await SeedSoftSkillsAsync(cancellationToken);
        await SeedProjectsAsync(cancellationToken);

        await context.SaveChangesAsync(cancellationToken);
    }

    private async Task SeedPersonalInfoAsync(CancellationToken cancellationToken)
    {
        if (await context.PersonalInfos.AnyAsync(cancellationToken))
            return;

        context.PersonalInfos.Add(new PersonalInfo
        {
            Id = Guid.NewGuid(),
            Name = "Maxime Razafinjato",
            TitleFr = "Responsable QA & Développeur Full-Stack",
            TitleEn = "QA Lead & Full-Stack Developer",
            Email = "maximerazafinjato@gmail.com",
            Phone = "+33 7 61 38 40 72",
            City = "Rouen",
            CountryFr = "France",
            CountryEn = "France"
        });
    }

    private async Task SeedSocialLinksAsync(CancellationToken cancellationToken)
    {
        if (await context.SocialLinks.AnyAsync(cancellationToken))
            return;

        context.SocialLinks.AddRange(
            new SocialLink
            {
                Id = Guid.NewGuid(),
                Platform = "LinkedIn",
                Url = "https://www.linkedin.com/in/maxime-razafinjato",
                DisplayOrder = 0
            },
            new SocialLink
            {
                Id = Guid.NewGuid(),
                Platform = "GitHub",
                Url = "https://github.com/MaximeRazafinjato",
                DisplayOrder = 1
            }
        );
    }

    private async Task SeedLanguagesAsync(CancellationToken cancellationToken)
    {
        if (await context.Languages.AnyAsync(cancellationToken))
            return;

        context.Languages.AddRange(
            new Language { Id = Guid.NewGuid(), NameFr = "Français", NameEn = "French", Level = LanguageLevel.Native, DisplayOrder = 0 },
            new Language { Id = Guid.NewGuid(), NameFr = "Anglais", NameEn = "English", Level = LanguageLevel.Fluent, DisplayOrder = 1 },
            new Language { Id = Guid.NewGuid(), NameFr = "Allemand", NameEn = "German", Level = LanguageLevel.Intermediate, DisplayOrder = 2 },
            new Language { Id = Guid.NewGuid(), NameFr = "Malgache", NameEn = "Malagasy", Level = LanguageLevel.Basic, DisplayOrder = 3 }
        );
    }

    private async Task SeedEducationAsync(CancellationToken cancellationToken)
    {
        if (await context.Educations.AnyAsync(cancellationToken))
            return;

        context.Educations.AddRange(
            new Education
            {
                Id = Guid.NewGuid(),
                PeriodStart = new DateTimeOffset(2011, 9, 1, 0, 0, 0, TimeSpan.Zero),
                PeriodEnd = new DateTimeOffset(2017, 6, 30, 0, 0, 0, TimeSpan.Zero),
                LocationFr = "Tananarive, Madagascar & Dakar, Sénégal",
                LocationEn = "Antananarivo, Madagascar & Dakar, Senegal",
                DescriptionFr = "Collège et Lycée - Baccalauréat Scientifique",
                DescriptionEn = "Middle and High School - Scientific Baccalaureate",
                FlagEmoji = "🇲🇬",
                DisplayOrder = 0
            },
            new Education
            {
                Id = Guid.NewGuid(),
                PeriodStart = new DateTimeOffset(2017, 9, 1, 0, 0, 0, TimeSpan.Zero),
                PeriodEnd = new DateTimeOffset(2020, 6, 30, 0, 0, 0, TimeSpan.Zero),
                LocationFr = "Île Maurice",
                LocationEn = "Mauritius",
                DescriptionFr = "Supinfo International University - Bachelor of Science",
                DescriptionEn = "Supinfo International University - Bachelor of Science",
                FlagEmoji = "🇲🇺",
                DisplayOrder = 1
            },
            new Education
            {
                Id = Guid.NewGuid(),
                PeriodStart = new DateTimeOffset(2021, 9, 1, 0, 0, 0, TimeSpan.Zero),
                PeriodEnd = new DateTimeOffset(2023, 6, 30, 0, 0, 0, TimeSpan.Zero),
                LocationFr = "Rouen, France",
                LocationEn = "Rouen, France",
                DescriptionFr = "CESI - Master Manager en Architecture et Applications Logicielles",
                DescriptionEn = "CESI - Master in Software Architecture and Applications",
                FlagEmoji = "🇫🇷",
                DisplayOrder = 2
            },
            new Education
            {
                Id = Guid.NewGuid(),
                PeriodStart = new DateTimeOffset(2023, 9, 1, 0, 0, 0, TimeSpan.Zero),
                PeriodEnd = null,
                LocationFr = "Rouen, France",
                LocationEn = "Rouen, France",
                DescriptionFr = "FTEL - Responsable Assurance Qualité",
                DescriptionEn = "FTEL - QA Lead",
                FlagEmoji = "🇫🇷",
                DisplayOrder = 3
            }
        );
    }

    private async Task SeedExperiencesAsync(CancellationToken cancellationToken)
    {
        if (await context.Experiences.AnyAsync(cancellationToken))
            return;

        context.Experiences.AddRange(
            new Experience
            {
                Id = Guid.NewGuid(),
                CompanyName = "FTEL",
                PositionFr = "Responsable Assurance Qualité",
                PositionEn = "QA Lead",
                PeriodStart = new DateTimeOffset(2023, 9, 1, 0, 0, 0, TimeSpan.Zero),
                PeriodEnd = null,
                IsCurrent = true,
                LocationFr = "Rouen, France",
                LocationEn = "Rouen, France",
                Technologies = "Selenium,Playwright,xUnit,Locust,GitLab CI,Docker",
                ResponsibilitiesFr = "[\"Établissement d'une stratégie de test complète de zéro\",\"Écriture de tests unitaires, d'intégration et end-to-end\",\"Automatisation des tests dans GitLab CI sous Docker\",\"Formation des équipes dev aux bonnes pratiques QA\",\"Documentation : Plan d'Assurance Qualité, Cahier de recette\",\"Gestion de projet interne et TMA\"]",
                ResponsibilitiesEn = "[\"Building a complete test strategy from scratch\",\"Writing unit, integration and end-to-end tests\",\"Test automation in GitLab CI with Docker\",\"Training dev teams on QA best practices\",\"Documentation: Quality Assurance Plan, Test books\",\"Internal project management and maintenance\"]",
                DisplayOrder = 0
            },
            new Experience
            {
                Id = Guid.NewGuid(),
                CompanyName = "FTEL",
                PositionFr = "Développeur Web - Alternant",
                PositionEn = "Web Developer - Apprentice",
                PeriodStart = new DateTimeOffset(2021, 9, 1, 0, 0, 0, TimeSpan.Zero),
                PeriodEnd = new DateTimeOffset(2023, 8, 31, 0, 0, 0, TimeSpan.Zero),
                IsCurrent = false,
                LocationFr = "Rouen, France",
                LocationEn = "Rouen, France",
                Technologies = ".NET,React,SQL Server,Git",
                ResponsibilitiesFr = "[\"Analyse et conception de solutions techniques\",\"Évolution, suivi et maintien des applications existantes\",\"Conduite de réunions avec des clients\"]",
                ResponsibilitiesEn = "[\"Analysis and design of technical solutions\",\"Evolution, monitoring and maintenance of existing applications\",\"Leading client meetings\"]",
                DisplayOrder = 1
            },
            new Experience
            {
                Id = Guid.NewGuid(),
                CompanyName = "Unicity",
                PositionFr = "Analyste Web - Stagiaire",
                PositionEn = "Web Analyst - Intern",
                PeriodStart = new DateTimeOffset(2020, 1, 1, 0, 0, 0, TimeSpan.Zero),
                PeriodEnd = new DateTimeOffset(2020, 6, 30, 0, 0, 0, TimeSpan.Zero),
                IsCurrent = false,
                LocationFr = "Île Maurice",
                LocationEn = "Mauritius",
                Technologies = ".NET,Azure DevOps,SOA",
                ResponsibilitiesFr = "[\"Réalisation d'un site de covoiturage (architecture SOA)\",\"Utilisation d'Azure DevOps\",\"Développement d'API REST en .NET\"]",
                ResponsibilitiesEn = "[\"Development of a carpooling website (SOA architecture)\",\"Using Azure DevOps\",\"REST API development in .NET\"]",
                DisplayOrder = 2
            },
            new Experience
            {
                Id = Guid.NewGuid(),
                CompanyName = "Accenture",
                PositionFr = "Développeur .NET - Stagiaire",
                PositionEn = ".NET Developer - Intern",
                PeriodStart = new DateTimeOffset(2019, 1, 1, 0, 0, 0, TimeSpan.Zero),
                PeriodEnd = new DateTimeOffset(2019, 6, 30, 0, 0, 0, TimeSpan.Zero),
                IsCurrent = false,
                LocationFr = "Île Maurice",
                LocationEn = "Mauritius",
                Technologies = "Azure Bot Service,LUIS.ai,Node.js,HTML,CSS",
                ResponsibilitiesFr = "[\"Réalisation d'un chatbot avec Azure Bot Service et LUIS.ai\",\"Site interne générant des CV basés sur le modèle de l'entreprise\"]",
                ResponsibilitiesEn = "[\"Development of a chatbot with Azure Bot Service and LUIS.ai\",\"Internal website generating CVs based on company template\"]",
                DisplayOrder = 3
            }
        );
    }

    private async Task SeedSkillCategoriesAndSkillsAsync(CancellationToken cancellationToken)
    {
        if (await context.SkillCategories.AnyAsync(cancellationToken))
            return;

        var categories = new List<(string NameFr, string NameEn, string[] Skills)>
        {
            ("Développement", "Development", [".NET", "C#", "ASP.NET", "React", "TypeScript", "JavaScript", "SQL", "Git"]),
            ("Tests", "Testing", ["Selenium", "Playwright", "xUnit", "Locust", "Tests manuels"]),
            ("DevOps", "DevOps", ["GitLab CI", "Docker", "Azure DevOps"]),
            ("Cloud & IA", "Cloud & AI", ["Azure OpenAI", "Azure AI Foundry", "RAG"]),
            ("Gestion de projet", "Project Management", ["JIRA", "Agile", "SCRUM"]),
            ("Outils", "Tools", ["VS Code", "Rider", "Postman", "Insomnia", "Notion", "Confluence", "GitHub Copilot", "Claude", "ChatGPT"])
        };

        var order = 0;
        foreach (var (nameFr, nameEn, skills) in categories)
        {
            var category = new SkillCategory
            {
                Id = Guid.NewGuid(),
                NameFr = nameFr,
                NameEn = nameEn,
                DisplayOrder = order++
            };
            context.SkillCategories.Add(category);

            var skillOrder = 0;
            foreach (var skillName in skills)
            {
                context.Skills.Add(new Skill
                {
                    Id = Guid.NewGuid(),
                    Name = skillName,
                    CategoryId = category.Id,
                    DisplayOrder = skillOrder++
                });
            }
        }
    }

    private async Task SeedSoftSkillsAsync(CancellationToken cancellationToken)
    {
        if (await context.SoftSkills.AnyAsync(cancellationToken))
            return;

        var softSkills = new[]
        {
            ("Esprit d'analyse", "Analytical thinking"),
            ("Communication", "Communication"),
            ("Collaboration Dev/QA", "Dev/QA Collaboration"),
            ("Adaptabilité", "Adaptability"),
            ("Autonomie", "Autonomy"),
            ("Résolution de problèmes", "Problem solving"),
            ("Curiosité technique", "Technical curiosity")
        };

        var order = 0;
        foreach (var (nameFr, nameEn) in softSkills)
        {
            context.SoftSkills.Add(new SoftSkill
            {
                Id = Guid.NewGuid(),
                NameFr = nameFr,
                NameEn = nameEn,
                DisplayOrder = order++
            });
        }
    }

    private async Task SeedProjectsAsync(CancellationToken cancellationToken)
    {
        if (await context.Projects.AnyAsync(cancellationToken))
            return;

        context.Projects.AddRange(
            new Project
            {
                Id = Guid.NewGuid(),
                Name = "POC-Keycloak",
                DescriptionFr = "Démonstration complète d'une authentification OIDC avec .NET 9, React 19 et Keycloak",
                DescriptionEn = "Complete OIDC authentication demo with .NET 9, React 19 and Keycloak",
                Technologies = ".NET 9,React 19,TypeScript,Keycloak,Docker,SQL Server",
                GithubUrl = "https://github.com/MaximeRazafinjato/POC-Keycloak",
                FeaturesFr = "[\"Login OIDC via Authorization Code avec PKCE\",\"Validation cryptographique des tokens JWT via JWKS\",\"Autorisations par rôles (admin/user)\",\"Single Logout avec purge de session\"]",
                FeaturesEn = "[\"OIDC Login via Authorization Code with PKCE\",\"Cryptographic JWT token validation via JWKS\",\"Role-based authorization (admin/user)\",\"Single Logout with session purge\"]",
                DisplayOrder = 0
            },
            new Project
            {
                Id = Guid.NewGuid(),
                Name = "POC-SIG",
                DescriptionFr = "Plateforme GIS moderne pour visualiser et gérer des données géospatiales",
                DescriptionEn = "Modern GIS platform to visualize and manage geospatial data",
                Technologies = "React 18,TypeScript,Leaflet,.NET 9,SQL Server,Docker",
                GithubUrl = "https://github.com/MaximeRazafinjato/POC-SIG",
                FeaturesFr = "[\"Export GeoJSON/CSV\",\"Sélection spatiale multi-couches\",\"Mode sombre/clair avec glassmorphism\"]",
                FeaturesEn = "[\"GeoJSON/CSV export\",\"Multi-layer spatial selection\",\"Dark/light mode with glassmorphism\"]",
                DisplayOrder = 1
            },
            new Project
            {
                Id = Guid.NewGuid(),
                Name = "POC Mindmap",
                DescriptionFr = "Application web de visualisation de graphes depuis des fichiers Excel",
                DescriptionEn = "Web app for graph visualization from Excel files",
                Technologies = "React,TypeScript,Vite,Tailwind CSS",
                GithubUrl = "https://github.com/MaximeRazafinjato/poc-mindmap",
                FeaturesFr = "[\"Conversion de données tabulaires en mindmap\",\"Représentations graphiques interactives\"]",
                FeaturesEn = "[\"Tabular data to mindmap conversion\",\"Interactive graph representations\"]",
                DisplayOrder = 2
            },
            new Project
            {
                Id = Guid.NewGuid(),
                Name = "AFKTradeNotification",
                DescriptionFr = "App console .NET pour surveiller les logs de Path of Exile et notifier les trades via Discord",
                DescriptionEn = ".NET console app to monitor Path of Exile logs and send trade notifications via Discord",
                Technologies = ".NET 8,Discord API,Regex",
                GithubUrl = "https://github.com/MaximeRazafinjato/AFKTradeNotification",
                FeaturesFr = "[\"Surveillance des logs en temps réel\",\"Notifications Discord automatiques pour les joueurs AFK\"]",
                FeaturesEn = "[\"Real-time log monitoring\",\"Automatic Discord notifications for AFK players\"]",
                DisplayOrder = 3
            }
        );
    }
}
