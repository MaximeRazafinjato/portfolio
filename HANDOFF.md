# Document de Passation - Portfolio Maxime Razafinjato

## Objectif

Créer un portfolio web personnel pour Maxime Razafinjato avec :
- **Frontend** : React 19 + Vite + TypeScript + ShadCN UI + Tailwind CSS + Framer Motion
- **Backend** : Azure Functions (.NET 9) + Azure SQL
- **Auth** : Auth0
- **Hosting** : Azure Blob Storage + CDN
- **Fonctionnalités** : Multilingue FR/EN, Dark/Light mode, Blog avec admin, Formulaire de contact

L'objectif est un portfolio moderne/tech avec un thème violet, des animations impactantes, et une timeline du parcours international.

---

## Progression actuelle

### ✅ Phase 0 - Planification (TERMINÉE)
- Extraction des informations du CV existant (`MaximeRazafinjato-QA-2025.pdf`)
- Session Q&A interactive pour définir les besoins
- Création du plan détaillé : `PLAN_PORTFOLIO.md`
- Création du plan d'implémentation : `IMPLEMENTATION_PLAN.md`

### ✅ Phase 1 - Setup Frontend (TERMINÉE)
Le projet `portfolio-frontend/` est créé et fonctionne.

### ✅ Phase 2 - Frontend Sections Publiques (TERMINÉE)

**Composants créés :**

```
portfolio-frontend/src/
├── components/
│   ├── layout/
│   │   ├── Header/
│   │   │   ├── index.tsx                    # Header principal sticky
│   │   │   └── _components/
│   │   │       ├── ThemeToggle/index.tsx    # Toggle dark/light mode
│   │   │       ├── LanguageSwitch/index.tsx # Switch FR/EN
│   │   │       ├── NavLink/index.tsx        # Liens navigation animés
│   │   │       └── MobileMenu/index.tsx     # Menu hamburger mobile
│   │   ├── Footer/index.tsx                 # Footer avec liens sociaux
│   │   └── MainLayout/index.tsx             # Layout principal (Header + Outlet + Footer)
│   └── features/
│       ├── Hero/
│       │   ├── index.tsx                    # Section Hero avec animations
│       │   └── _components/
│       │       └── TypewriterText/index.tsx # Effet typewriter pour le nom
│       ├── About/
│       │   ├── index.tsx                    # Section À propos
│       │   └── _components/
│       │       ├── TimelineItem/index.tsx   # Item de timeline parcours
│       │       └── LanguageCard/index.tsx   # Carte de langue
│       ├── Experience/
│       │   ├── index.tsx                    # Section Expériences
│       │   └── _components/
│       │       └── ExperienceCard/index.tsx # Carte expérience glassmorphism
│       ├── Projects/
│       │   ├── index.tsx                    # Section Projets
│       │   └── _components/
│       │       └── ProjectCard/index.tsx    # Carte projet interactive
│       ├── Skills/
│       │   ├── index.tsx                    # Section Compétences
│       │   └── _components/
│       │       ├── SkillCategory/index.tsx  # Catégorie de skills
│       │       └── SoftSkillBadge/index.tsx # Badge soft skill
│       └── Contact/
│           ├── index.tsx                    # Section Contact
│           └── _components/
│               ├── ContactForm/
│               │   ├── index.tsx            # Formulaire contact
│               │   └── types.ts             # Schema Zod + types
│               └── SocialLinks/index.tsx    # Liens sociaux + infos contact
└── pages/
    └── HomePage.tsx                         # Page d'accueil avec toutes les sections
```

**Fonctionnalités implémentées :**
- Header sticky avec navigation smooth scroll
- Menu mobile responsive avec animations
- Toggle theme dark/light (persisté localStorage)
- Switch langue FR/EN
- Section Hero avec effet typewriter, background blur gradients
- Section About avec timeline parcours international (drapeaux emoji)
- Section Experience avec cards glassmorphism
- Section Projects avec cards interactives (hover effects)
- Section Skills avec grille par catégorie + soft skills
- Section Contact avec formulaire Zod/react-hook-form + toast notifications
- Footer avec liens sociaux (GitHub, LinkedIn, Email)
- Animations Framer Motion partout (fadeInUp, staggerContainer, scaleIn)

### ✅ Phase 3 - Backend Azure Functions (TERMINÉE)

**Structure du projet backend :**

```
portfolio-backend/
├── Portfolio.sln                          # Solution .NET 9
├── Portfolio.Core/                        # Couche Domaine
│   ├── Common/
│   │   ├── BaseEntity.cs                  # Entité de base (Id, CreatedAt, UpdatedAt)
│   │   ├── Result.cs                      # Result pattern pour gestion erreurs
│   │   ├── PaginatedResult.cs             # Résultat paginé générique
│   │   ├── IService.cs                    # Interface marqueur pour services
│   │   ├── IValidator.cs                  # Interface pour validateurs
│   │   └── IUnitOfWork.cs                 # Interfaces Unit of Work
│   ├── Blog/
│   │   ├── Article.cs                     # Entité Article (bilingue FR/EN)
│   │   └── IArticleRepository.cs          # Interface repository
│   └── Contact/
│       ├── ContactMessage.cs              # Entité message de contact
│       └── IContactMessageRepository.cs   # Interface repository
├── Portfolio.Application/                 # Couche Services Métier
│   ├── Blog/
│   │   ├── GetArticles/
│   │   │   ├── ArticleListModel.cs
│   │   │   └── GetArticlesService.cs
│   │   ├── GetArticleBySlug/
│   │   │   ├── ArticleDetailModel.cs
│   │   │   └── GetArticleBySlugService.cs
│   │   ├── CreateArticle/
│   │   │   ├── CreateArticleModel.cs
│   │   │   ├── CreateArticleService.cs
│   │   │   └── CreateArticleValidator.cs  # Validateur séparé
│   │   ├── UpdateArticle/
│   │   │   ├── UpdateArticleModel.cs
│   │   │   ├── UpdateArticleService.cs
│   │   │   └── UpdateArticleValidator.cs  # Validateur séparé
│   │   └── DeleteArticle/
│   │       └── DeleteArticleService.cs
│   ├── Contact/
│   │   └── SendContact/
│   │       ├── SendContactModel.cs
│   │       ├── SendContactService.cs
│   │       └── SendContactValidator.cs    # Validateur séparé
│   └── DependencyInjection.cs
├── Portfolio.Infrastructure/              # Couche Persistance
│   ├── Data/
│   │   ├── PortfolioDbContext.cs
│   │   ├── PortfolioDbContextFactory.cs
│   │   ├── UnitOfWork.cs                  # Implémentation Unit of Work
│   │   └── Migrations/
│   │       └── InitialCreate.cs
│   ├── Repositories/
│   │   ├── ArticleRepository.cs
│   │   └── ContactMessageRepository.cs
│   └── DependencyInjection.cs
└── Portfolio.Functions/                   # Azure Functions (API)
    ├── Blog/
    │   ├── GetArticlesFunction.cs         # GET /api/articles
    │   ├── GetArticleBySlugFunction.cs    # GET /api/articles/{slug}
    │   ├── CreateArticleFunction.cs       # POST /api/articles (auth)
    │   ├── UpdateArticleFunction.cs       # PUT /api/articles/{id} (auth)
    │   └── DeleteArticleFunction.cs       # DELETE /api/articles/{id} (auth)
    ├── Contact/
    │   └── SendContactFunction.cs         # POST /api/contact
    ├── Program.cs
    ├── host.json
    └── local.settings.json
```

**API Endpoints :**

| Méthode | Route | Auth | Description |
|---------|-------|------|-------------|
| GET | `/api/articles` | Non | Liste paginée des articles publiés |
| GET | `/api/articles/{slug}` | Non | Détail d'un article par slug |
| POST | `/api/articles` | Oui | Créer un nouvel article |
| PUT | `/api/articles/{id}` | Oui | Modifier un article existant |
| DELETE | `/api/articles/{id}` | Oui | Supprimer un article |
| POST | `/api/contact` | Non | Envoyer un message de contact |

**Technologies et patterns utilisés :**
- .NET 9 Isolated Worker
- Entity Framework Core 9 + SQL Server
- Clean Architecture (Core/Application/Infrastructure/Functions)
- **Pattern Service + Validator séparé** (conforme BACKEND_ARCHITECTURE.md)
- **Pattern Unit of Work** pour la gestion transactionnelle
- **Result pattern** pour la gestion des erreurs
- Interfaces `IService` et `IValidator<T>` pour l'injection
- Méthodes repository nommées `GetOrDefaultAsync` (convention)
- Messages d'erreur en français

### ✅ Phase 4 - Frontend Admin (TERMINÉE)

**Structure créée :**

```
portfolio-frontend/src/
├── lib/
│   └── api.ts                                # Client axios + endpoints API
├── hooks/
│   └── useAuthToken.ts                       # Hook pour injecter le token Auth0
├── domains/
│   └── blog/
│       ├── index.ts                          # Barrel export
│       ├── types.ts                          # Types Article + schéma Zod
│       ├── constants.ts                      # Query keys React Query
│       ├── queries.ts                        # useArticlesQuery, useArticleByIdQuery
│       └── mutations.ts                      # CRUD mutations (create, update, delete, toggle publish)
├── pages/
│   └── admin/
│       ├── AdminDashboard.tsx                # Dashboard avec liste articles
│       ├── AdminBlogEditor.tsx               # Page éditeur (new/edit)
│       └── _components/
│           ├── ArticleList/index.tsx         # Liste paginée avec actions
│           ├── ArticleListItem/index.tsx     # Item avec boutons (éditer, supprimer, publier)
│           └── BlogEditorForm/index.tsx      # Formulaire bilingue FR/EN avec tabs
└── components/
    ├── ui/
    │   └── textarea.tsx                      # Composant Textarea (ajouté)
    └── features/
        └── Admin/
            └── AdminLayout/index.tsx         # Layout admin avec Auth0 (amélioré)
```

**Fonctionnalités implémentées :**
- Routes protégées Auth0 (`/admin`, `/admin/blog/new`, `/admin/blog/:id/edit`)
- Layout admin avec authentification (login/logout, affichage email)
- Dashboard avec liste des articles paginée
- Actions sur articles : éditer, supprimer, publier/dépublier
- Éditeur d'article bilingue avec onglets FR/EN
- Formulaire validé avec Zod (titre, contenu, extrait, tags, image)
- Boutons "Sauvegarder brouillon" et "Publier"
- Intégration React Query (TanStack Query v5) pour le cache et les mutations
- Client axios avec injection automatique du token Auth0

### ✅ Phase 5 - Blog Public (TERMINÉE)

**Composants créés :**

```
portfolio-frontend/src/
├── pages/
│   ├── BlogDetailPage.tsx                    # Page détail article avec Markdown
│   └── blog/
│       ├── BlogListPage.tsx                  # Liste paginée des articles
│       └── _components/
│           └── ArticleCard/index.tsx         # Card article pour la liste
├── components/features/
│   └── Blog/
│       ├── index.tsx                         # Section "Derniers articles" pour HomePage
│       └── _components/
│           └── RecentArticleCard/index.tsx   # Card article compact
```

**Fonctionnalités implémentées :**
- Page `/blog` avec liste paginée des articles publiés
- Page `/blog/:slug` avec rendu Markdown (react-markdown + remark-gfm + rehype-highlight)
- Coloration syntaxique du code (highlight.js github-dark theme)
- Section "Derniers articles" sur la HomePage (3 articles)
- Navigation mise à jour : lien Blog pointe vers `/blog`
- Support bilingue FR/EN pour titre, contenu, extrait
- Métadonnées : date, temps de lecture estimé, tags
- Image de couverture optionnelle
- Skeleton loading states

**Packages ajoutés :**
- react-markdown 10.1.0
- remark-gfm 4.0.1
- rehype-highlight 7.0.2

### ✅ Phase 6 - Polish & Optimisations (TERMINÉE)

**Composants créés :**

```
portfolio-frontend/src/
├── components/common/
│   ├── SEO/index.tsx                    # Meta tags dynamiques (OG, Twitter, article)
│   ├── ScrollToTop/index.tsx            # Scroll to top sur changement de route
│   ├── ReadingProgressBar/index.tsx     # Barre de progression lecture articles
│   └── SkipLink/index.tsx               # Skip link accessibilité
└── pages/
    └── NotFoundPage.tsx                 # Page 404 personnalisée
```

**Fonctionnalités implémentées :**

1. **SEO & Meta tags**
   - Composant `SEO` réutilisable avec react-helmet-async
   - Meta tags Open Graph et Twitter Cards
   - Support articles (publishedTime, modifiedTime, tags)
   - Traductions bilingues FR/EN
   - Canonical URLs

2. **Page 404**
   - Design cohérent avec thème violet
   - Animations Framer Motion
   - Boutons "Retour accueil" et "Page précédente"
   - noIndex pour SEO

3. **UX Améliorations**
   - ScrollToTop automatique sur changement de route
   - Progress bar de lecture sur les articles (Framer Motion spring)

4. **Accessibilité**
   - Skip link "Aller au contenu principal"
   - ARIA labels traduits sur Header, Footer, ThemeToggle, LanguageSwitch
   - aria-expanded et aria-controls sur menu mobile
   - id="main-content" avec tabIndex pour focus management
   - Navigation landmarks avec aria-label

**Packages ajoutés :**
- react-helmet-async 2.0.5

### ❌ Phases restantes
- **Phase 7** : Déploiement Azure
- **Phase 8** : Contenu (données, traductions, assets)

---

## Ce qui a fonctionné

### Frontend
1. **pnpm** : Gestionnaire de paquets utilisé selon les guidelines
2. **ShadCN UI init** : Nécessitait d'abord configurer Tailwind et les alias tsconfig
3. **Tailwind CSS v4** : Utilise `@import "tailwindcss"` et `@tailwindcss/vite` plugin
4. **Thème violet** : Configuré via CSS variables OKLCH dans `index.css`
5. **Structure modulaire** : Dossiers par feature, un composant par fichier, sous-composants dans `_components/`
6. **Framer Motion** : Animations fluides avec variants réutilisables
7. **TypeScript** : Build sans erreurs

### Backend
1. **Azure Functions .NET 9** : Template installé via `dotnet new install Microsoft.Azure.Functions.Worker.ProjectTemplates`
2. **Clean Architecture** : Séparation Core/Application/Infrastructure/Functions
3. **EF Core 9** : Migrations design-time avec `IDesignTimeDbContextFactory`
4. **Articles bilingues** : Champs Title/Content/Excerpt en FR et EN
5. **Pattern Service + Validator** : Validateurs dans des fichiers séparés (conforme BACKEND_ARCHITECTURE.md)
6. **Unit of Work** : Gestion transactionnelle propre avec `IUnitOfWorkManager`
7. **Result pattern** : Classes `Result` et `Result<T>` dans Core/Common
8. **Convention nommage repository** : `GetOrDefaultAsync` pour les retours nullables

---

## Ce qui n'a pas fonctionné

### Frontend
1. **ShadCN init sans config préalable** : Erreur si Tailwind et alias tsconfig ne sont pas configurés d'abord
2. **Toast component** : Déprécié, utiliser `sonner` à la place
3. **Options shadcn obsolètes** : `--style` n'existe plus, utiliser `-t vite -b neutral`

### Backend
1. **Template Azure Functions** : Options `-f` et `--worker` n'existent pas, utiliser `-F` pour le framework
2. **EF Core migrations** : Nécessite `IDesignTimeDbContextFactory` car la connection string n'est pas disponible au design-time
3. **Result avec héritage** : `protected init` nécessaire pour les propriétés partagées entre `Result` et `Result<T>`

---

## Prochaines étapes

### Phase 6 - Polish & Optimisations

1. **SEO & Performance**
   - Meta tags dynamiques (react-helmet ou équivalent)
   - Lazy loading des images
   - Optimisation du bundle

2. **UX Améliorations**
   - Page 404 personnalisée
   - Scroll to top on navigation
   - Progress bar de lecture pour les articles

3. **Accessibilité**
   - Skip links
   - ARIA labels complets
   - Focus management

---

## Commandes pour développer

### Frontend
```bash
cd D:\Projects\FTEL\cv\portfolio-frontend
pnpm dev
# Site accessible sur http://localhost:5173
```

### Backend
```bash
cd D:\Projects\FTEL\cv\portfolio-backend

# Build
dotnet build

# Lancer Azure Functions localement
cd Portfolio.Functions
func start
# API accessible sur http://localhost:7071

# Créer une migration EF Core
dotnet ef migrations add NomMigration --project Portfolio.Infrastructure --startup-project Portfolio.Functions --output-dir Data/Migrations

# Appliquer les migrations
dotnet ef database update --project Portfolio.Infrastructure --startup-project Portfolio.Functions
```

---

## Fichiers de référence importants

| Fichier | Description |
|---------|-------------|
| `PLAN_PORTFOLIO.md` | Plan complet du contenu et specs techniques |
| `IMPLEMENTATION_PLAN.md` | Plan d'implémentation détaillé en 8 phases |
| `portfolio-frontend/src/constants/*.ts` | Données frontend (expériences, projets, skills) |
| `portfolio-frontend/src/locales/*/translation.json` | Traductions FR/EN |
| `portfolio-frontend/src/index.css` | Thème violet avec variables CSS |
| `portfolio-backend/Portfolio.Functions/local.settings.json` | Config locale backend (Auth0, DB) |

---

## Décisions techniques prises

### Frontend
1. **React Router v7** avec lazy loading pour les pages
2. **Tailwind CSS v4** avec plugin Vite (pas de tailwind.config.js)
3. **ShadCN UI** style New York, base neutral customisé en violet
4. **Framer Motion** pour les animations (variants déjà définis dans `constants/animations.ts`)
5. **i18next** avec détection automatique de langue (localStorage + navigator)
6. **Lucide React** pour les icônes
7. **Sonner** pour les notifications toast

### Backend
1. **Azure Functions Isolated Worker** (.NET 9)
2. **Clean Architecture** simplifiée (4 couches)
3. **EF Core 9** avec SQL Server
4. **Articles bilingues** (champs FR/EN pour titre, contenu, extrait)
5. **Tags stockés** en string séparé par virgules (simplification)
6. **Auth0** pour l'authentification admin (à configurer avec credentials)
7. **Génération automatique de slug** à partir du titre
8. **Validation métier** dans les services avec Result pattern

---

## Configuration Auth0 requise

Dans `local.settings.json` du backend, remplacer :
```json
{
  "Auth0": {
    "Domain": "YOUR_AUTH0_DOMAIN.auth0.com",
    "Audience": "YOUR_AUTH0_API_IDENTIFIER"
  }
}
```

Dans le frontend, configurer les variables d'environnement Auth0 dans `.env`.

---

## Notes pour le prochain agent

- Lire le module `~/.claude/modules/FRONTEND_ARCHITECTURE.md` avant de coder le frontend
- Lire le module `~/.claude/modules/BACKEND_ARCHITECTURE.md` pour référence (adapté à Azure Functions)
- Utiliser Context7 MCP pour la documentation des librairies
- Utiliser `pnpm` pour le frontend (pas npm/yarn)
- Le backend est en .NET 9 avec Azure Functions
- Les articles sont bilingues (FR/EN) - champs séparés, pas de système de traduction dynamique
- L'authentification Auth0 n'est pas encore complètement implémentée côté backend (middleware JWT à ajouter)
