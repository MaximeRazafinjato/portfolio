# Plan d'Implémentation - Portfolio Maxime Razafinjato

## Vue d'ensemble

**Stack technique :**
- **Frontend** : React 19 + Vite + TypeScript + ShadCN UI + Tailwind CSS + Framer Motion
- **Backend** : Azure Functions (.NET 9) + Azure SQL
- **Auth** : Auth0
- **Hosting** : Azure Blob Storage + CDN
- **i18n** : FR/EN

---

# PHASE 0 : SETUP INFRASTRUCTURE AZURE

## 0.1 Création des ressources Azure

### 0.1.1 Resource Group
- [ ] Créer le Resource Group `rg-portfolio-maxime-prod`
- [ ] Définir la région (West Europe)
- [ ] Ajouter les tags (projet, environnement, owner)

### 0.1.2 Azure SQL Database
- [ ] Créer le serveur SQL `sql-portfolio-maxime`
- [ ] Créer la base de données `sqldb-portfolio` (tier Basic/S0)
- [ ] Configurer le firewall (autoriser Azure services + IP dev)
- [ ] Créer le user applicatif (pas admin)
- [ ] Générer la connection string

### 0.1.3 Azure Storage Account
- [ ] Créer le Storage Account `stportfoliomaxime`
- [ ] Activer le Static Website hosting
- [ ] Configurer le container `$web`
- [ ] Définir les règles CORS

### 0.1.4 Azure CDN
- [ ] Créer le profil CDN `cdn-portfolio-maxime`
- [ ] Créer l'endpoint pointant vers le Storage Account
- [ ] Configurer les règles de cache
- [ ] Préparer le custom domain (DNS à configurer après achat)

### 0.1.5 Azure Function App
- [ ] Créer le Function App `func-portfolio-maxime`
- [ ] Plan Consumption (serverless)
- [ ] Runtime .NET 9 Isolated
- [ ] Configurer Application Insights
- [ ] Ajouter les App Settings (connection strings, Auth0 config)

### 0.1.6 Auth0
- [ ] Créer l'application Auth0 (SPA)
- [ ] Configurer les Allowed Callback URLs
- [ ] Configurer les Allowed Logout URLs
- [ ] Configurer les Allowed Web Origins
- [ ] Créer l'API Auth0 pour le backend
- [ ] Récupérer Domain, Client ID, Audience

---

# PHASE 1 : SETUP PROJET FRONTEND

## 1.1 Initialisation du projet

### 1.1.1 Création projet Vite
- [ ] `pnpm create vite@latest portfolio-frontend --template react-ts`
- [ ] Configurer `vite.config.ts` (alias `@/`, port dev)
- [ ] Configurer `tsconfig.json` (strict mode, paths)

### 1.1.2 Installation des dépendances core
```bash
pnpm add react-router-dom@7 framer-motion i18next react-i18next
pnpm add @tanstack/react-query axios zod react-hook-form @hookform/resolvers
pnpm add @auth0/auth0-react
pnpm add -D tailwindcss postcss autoprefixer @types/node
```

### 1.1.3 Setup Tailwind CSS
- [ ] `npx tailwindcss init -p`
- [ ] Configurer `tailwind.config.ts` (dark mode, theme violet)
- [ ] Créer `src/styles/globals.css`

### 1.1.4 Setup ShadCN UI
- [ ] `pnpm dlx shadcn@latest init`
- [ ] Installer les composants de base : button, card, input, form, dialog, dropdown-menu, toast, tabs, separator, avatar, badge, skeleton

## 1.2 Structure des dossiers

```
src/
├── assets/
│   ├── images/
│   │   └── profile.jpg
│   └── icons/
├── components/
│   ├── ui/                    # ShadCN components
│   ├── layout/
│   │   ├── Header/
│   │   │   └── index.tsx
│   │   ├── Footer/
│   │   │   └── index.tsx
│   │   ├── ThemeToggle/
│   │   │   └── index.tsx
│   │   ├── LanguageSwitch/
│   │   │   └── index.tsx
│   │   └── MainLayout/
│   │       └── index.tsx
│   ├── features/
│   │   ├── Hero/
│   │   │   ├── index.tsx
│   │   │   ├── HeroTitle/
│   │   │   │   └── index.tsx
│   │   │   └── HeroSubtitle/
│   │   │       └── index.tsx
│   │   ├── About/
│   │   │   ├── index.tsx
│   │   │   └── Timeline/
│   │   │       └── index.tsx
│   │   ├── Experience/
│   │   │   ├── index.tsx
│   │   │   └── ExperienceCard/
│   │   │       └── index.tsx
│   │   ├── Projects/
│   │   │   ├── index.tsx
│   │   │   └── ProjectCard/
│   │   │       └── index.tsx
│   │   ├── Skills/
│   │   │   ├── index.tsx
│   │   │   └── SkillCategory/
│   │   │       └── index.tsx
│   │   ├── Blog/
│   │   │   ├── index.tsx
│   │   │   ├── BlogList/
│   │   │   │   └── index.tsx
│   │   │   ├── BlogCard/
│   │   │   │   └── index.tsx
│   │   │   └── BlogDetail/
│   │   │       └── index.tsx
│   │   ├── Contact/
│   │   │   ├── index.tsx
│   │   │   └── ContactForm/
│   │   │       └── index.tsx
│   │   └── Admin/
│   │       ├── AdminLayout/
│   │       │   └── index.tsx
│   │       ├── BlogEditor/
│   │       │   └── index.tsx
│   │       └── BlogList/
│   │           └── index.tsx
│   └── common/
│       ├── AnimatedSection/
│       │   └── index.tsx
│       ├── SocialLinks/
│       │   └── index.tsx
│       └── ScrollToTop/
│           └── index.tsx
├── configs/
│   ├── i18n.ts
│   ├── routes.tsx
│   ├── theme.ts
│   └── auth0.ts
├── constants/
│   ├── personal-info.ts
│   ├── experiences.ts
│   ├── projects.ts
│   ├── skills.ts
│   ├── navigation.ts
│   └── animations.ts
├── contexts/
│   ├── ThemeContext.tsx
│   └── QueryClientProvider.tsx
├── domains/
│   ├── blog/
│   │   ├── types.ts
│   │   ├── queries.ts
│   │   ├── mutations.ts
│   │   └── constants.ts
│   └── contact/
│       ├── types.ts
│       └── mutations.ts
├── hooks/
│   ├── useScrollProgress.ts
│   ├── useInView.ts
│   └── useMediaQuery.ts
├── locales/
│   ├── fr/
│   │   └── translation.json
│   └── en/
│       └── translation.json
├── types/
│   └── index.ts
├── utils/
│   ├── cn.ts
│   └── formatters.ts
├── App.tsx
├── main.tsx
└── index.css
```

## 1.3 Configuration des fichiers de base

### 1.3.1 Configuration Tailwind avec thème violet
- [ ] Créer la palette de couleurs (violet primary, dark/light modes)
- [ ] Configurer les fonts (Inter, JetBrains Mono pour code)
- [ ] Ajouter les animations custom

### 1.3.2 Configuration i18n
- [ ] Setup i18next avec détection de langue
- [ ] Créer les fichiers de traduction FR/EN
- [ ] Configurer le fallback language

### 1.3.3 Configuration React Query
- [ ] Setup QueryClient avec options par défaut
- [ ] Configurer le staleTime et cacheTime

### 1.3.4 Configuration Auth0
- [ ] Setup Auth0Provider
- [ ] Configurer les guards pour les routes admin

### 1.3.5 Configuration du routing
- [ ] Setup React Router v7
- [ ] Définir les routes publiques et protégées
- [ ] Configurer le lazy loading des pages

---

# PHASE 2 : DÉVELOPPEMENT FRONTEND - SECTIONS PUBLIQUES

## 2.1 Layout Principal

### 2.1.1 MainLayout
- [ ] Structure avec Header + Main + Footer
- [ ] Gestion du scroll
- [ ] Background avec effets (gradient, particles optionnel)

### 2.1.2 Header
- [ ] Logo/Nom
- [ ] Navigation (smooth scroll vers sections)
- [ ] ThemeToggle (dark/light)
- [ ] LanguageSwitch (FR/EN)
- [ ] Menu mobile (hamburger)
- [ ] Animation au scroll (shrink/blur)

### 2.1.3 Footer
- [ ] Copyright
- [ ] Liens sociaux (LinkedIn, GitHub, Email)
- [ ] Lien vers admin (discret)

## 2.2 Section Hero

### 2.2.1 HeroTitle
- [ ] Nom avec animation typewriter ou reveal
- [ ] Titre "Responsable QA & Développeur Full-Stack"
- [ ] Animation d'entrée Framer Motion

### 2.2.2 HeroSubtitle
- [ ] Accroche personnelle
- [ ] Animation staggered

### 2.2.3 Hero CTA
- [ ] Bouton "Me contacter"
- [ ] Bouton "Voir mes projets"
- [ ] Animation hover glassmorphism

### 2.2.4 Hero Visual
- [ ] Photo de profil avec effet
- [ ] Éléments décoratifs (cercles, lignes)
- [ ] Parallax effect au scroll

## 2.3 Section À Propos

### 2.3.1 About Content
- [ ] Texte de présentation
- [ ] Animation reveal au scroll

### 2.3.2 Timeline Parcours International
- [ ] Frise chronologique verticale
- [ ] Points : Madagascar → Sénégal → Maurice → France
- [ ] Dates et descriptions
- [ ] Animation progressive au scroll
- [ ] Icônes de drapeaux ou pins

### 2.3.3 Langues
- [ ] Liste des langues avec niveaux
- [ ] Barres de progression animées

## 2.4 Section Expériences

### 2.4.1 ExperienceCard
- [ ] Card avec glassmorphism
- [ ] Logo entreprise (optionnel)
- [ ] Titre du poste
- [ ] Entreprise + lieu + dates
- [ ] Liste des responsabilités
- [ ] Tags technologies
- [ ] Animation hover

### 2.4.2 Experience List
- [ ] 4 expériences (FTEL x2, Unicity, Accenture)
- [ ] Animation staggered au scroll
- [ ] Alternance gauche/droite (desktop)

## 2.5 Section Projets

### 2.5.1 ProjectCard
- [ ] Image/Screenshot du projet
- [ ] Titre
- [ ] Description courte
- [ ] Tags technologies
- [ ] Lien GitHub
- [ ] Lien démo (si applicable)
- [ ] Animation 3D tilt au hover

### 2.5.2 Projects Grid
- [ ] 4 projets (POC Mindmap, POC-SIG, POC-Keycloak, AFKTradeNotification)
- [ ] Grid responsive (2 cols desktop, 1 col mobile)
- [ ] Animation masonry ou staggered

## 2.6 Section Compétences

### 2.6.1 SkillCategory
- [ ] Titre de catégorie
- [ ] Icône de catégorie
- [ ] Liste de skills avec icônes
- [ ] Animation au hover

### 2.6.2 Skills Grid
- [ ] 6 catégories : Dev, Test, DevOps, Cloud/IA, Gestion projet, Outils
- [ ] Grid responsive
- [ ] Animation reveal au scroll

### 2.6.3 Soft Skills
- [ ] Section dédiée
- [ ] Présentation visuelle (badges ou cards)

## 2.7 Section Blog (Liste)

### 2.7.1 BlogCard
- [ ] Image de couverture
- [ ] Titre
- [ ] Extrait
- [ ] Date
- [ ] Tags
- [ ] Temps de lecture estimé
- [ ] Animation hover

### 2.7.2 BlogList
- [ ] Fetch des articles depuis l'API
- [ ] Pagination ou infinite scroll
- [ ] État loading (skeletons)
- [ ] État vide
- [ ] Filtres par tag (optionnel)

## 2.8 Section Contact

### 2.8.1 Contact Info
- [ ] Email (cliquable mailto)
- [ ] LinkedIn (lien externe)
- [ ] GitHub (lien externe)
- [ ] Localisation (Rouen, France)

### 2.8.2 ContactForm
- [ ] Champs : Nom, Email, Sujet, Message
- [ ] Validation Zod
- [ ] Submit vers Azure Function
- [ ] États : idle, loading, success, error
- [ ] Animations feedback

## 2.9 Animations Globales

### 2.9.1 AnimatedSection (wrapper réutilisable)
- [ ] Intersection Observer
- [ ] Variants Framer Motion (fadeInUp, fadeInLeft, etc.)
- [ ] Props : delay, duration, direction

### 2.9.2 Scroll Progress
- [ ] Barre de progression en haut de page
- [ ] Animation smooth

### 2.9.3 Smooth Scroll
- [ ] Navigation fluide entre sections
- [ ] Offset pour le header fixe

---

# PHASE 3 : DÉVELOPPEMENT BACKEND - AZURE FUNCTIONS

## 3.1 Setup projet Azure Functions

### 3.1.1 Création du projet
- [ ] `func init portfolio-backend --dotnet-isolated`
- [ ] Configurer pour .NET 9
- [ ] Structure Clean Architecture simplifiée

### 3.1.2 Structure des dossiers
```
portfolio-backend/
├── Portfolio.Functions/           # Azure Functions (API)
│   ├── Blog/
│   │   ├── GetArticlesFunction.cs
│   │   ├── GetArticleBySlugFunction.cs
│   │   ├── CreateArticleFunction.cs
│   │   ├── UpdateArticleFunction.cs
│   │   └── DeleteArticleFunction.cs
│   ├── Contact/
│   │   └── SendContactFunction.cs
│   ├── Middleware/
│   │   └── Auth0AuthenticationMiddleware.cs
│   └── Program.cs
├── Portfolio.Core/                # Entités et interfaces
│   ├── Blog/
│   │   ├── Article.cs
│   │   └── IArticleRepository.cs
│   └── Contact/
│       └── ContactMessage.cs
├── Portfolio.Application/         # Services métier
│   ├── Blog/
│   │   ├── GetArticles/
│   │   ├── GetArticleBySlug/
│   │   ├── CreateArticle/
│   │   ├── UpdateArticle/
│   │   └── DeleteArticle/
│   └── Contact/
│       └── SendContact/
└── Portfolio.Infrastructure/      # EF Core + Repositories
    ├── Data/
    │   └── PortfolioDbContext.cs
    ├── Repositories/
    │   └── ArticleRepository.cs
    └── Services/
        └── EmailService.cs
```

## 3.2 Entités et Base de données

### 3.2.1 Entité Article
```csharp
public class Article
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string TitleEn { get; set; }
    public string Slug { get; set; }
    public string Content { get; set; }      // Markdown
    public string ContentEn { get; set; }
    public string Excerpt { get; set; }
    public string ExcerptEn { get; set; }
    public string? CoverImageUrl { get; set; }
    public string[] Tags { get; set; }
    public bool IsPublished { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset? PublishedAt { get; set; }
    public DateTimeOffset? UpdatedAt { get; set; }
}
```

### 3.2.2 Entité ContactMessage
```csharp
public class ContactMessage
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Subject { get; set; }
    public string Message { get; set; }
    public DateTimeOffset SentAt { get; set; }
    public bool IsRead { get; set; }
}
```

### 3.2.3 DbContext et Migrations
- [ ] Configurer EF Core avec Azure SQL
- [ ] Créer les migrations
- [ ] Script de seed initial (optionnel)

## 3.3 Azure Functions - Blog

### 3.3.1 GET /api/articles
- [ ] Récupérer la liste des articles publiés
- [ ] Pagination (page, pageSize)
- [ ] Tri par date
- [ ] Filtre par tag (optionnel)
- [ ] Projection pour liste (sans content complet)

### 3.3.2 GET /api/articles/{slug}
- [ ] Récupérer un article par son slug
- [ ] Inclure le contenu complet
- [ ] 404 si non trouvé ou non publié

### 3.3.3 POST /api/articles (Auth required)
- [ ] Créer un nouvel article
- [ ] Validation du modèle
- [ ] Génération automatique du slug
- [ ] Authentification Auth0 requise

### 3.3.4 PUT /api/articles/{id} (Auth required)
- [ ] Mettre à jour un article
- [ ] Validation du modèle
- [ ] Authentification Auth0 requise

### 3.3.5 DELETE /api/articles/{id} (Auth required)
- [ ] Supprimer un article (soft delete ou hard delete)
- [ ] Authentification Auth0 requise

## 3.4 Azure Functions - Contact

### 3.4.1 POST /api/contact
- [ ] Recevoir le message de contact
- [ ] Validation (email format, champs requis)
- [ ] Sauvegarder en base
- [ ] Envoyer notification email (optionnel, via SendGrid ou autre)
- [ ] Rate limiting basique (par IP)

## 3.5 Authentification Auth0

### 3.5.1 Middleware Auth0
- [ ] Valider le JWT token
- [ ] Extraire les claims
- [ ] Protéger les endpoints admin

### 3.5.2 Configuration
- [ ] Variables d'environnement (Domain, Audience)
- [ ] CORS configuration

---

# PHASE 4 : DÉVELOPPEMENT FRONTEND - ADMIN

## 4.1 Routes Admin protégées

### 4.1.1 Guard Auth0
- [ ] Vérifier l'authentification
- [ ] Rediriger vers login si non connecté
- [ ] Vérifier les permissions/rôles

### 4.1.2 Routes
- [ ] `/admin` - Dashboard (liste des articles)
- [ ] `/admin/blog/new` - Créer un article
- [ ] `/admin/blog/:id/edit` - Éditer un article

## 4.2 Admin Layout

### 4.2.1 AdminLayout
- [ ] Sidebar navigation
- [ ] Header avec user info + logout
- [ ] Main content area
- [ ] Style cohérent avec le portfolio

## 4.3 Blog Management

### 4.3.1 BlogList (Admin)
- [ ] Liste tous les articles (publiés + brouillons)
- [ ] Actions : éditer, supprimer, publier/dépublier
- [ ] Badge statut (publié/brouillon)
- [ ] Confirmation avant suppression

### 4.3.2 BlogEditor
- [ ] Formulaire complet
- [ ] Éditeur Markdown (react-markdown-editor ou Monaco)
- [ ] Preview live du rendu
- [ ] Upload image de couverture (Azure Blob)
- [ ] Gestion des tags
- [ ] Champs FR et EN
- [ ] Boutons : Sauvegarder brouillon, Publier
- [ ] Validation Zod

---

# PHASE 5 : PAGE DÉTAIL BLOG

## 5.1 BlogDetail Page

### 5.1.1 Route `/blog/:slug`
- [ ] Fetch article par slug
- [ ] Rendu Markdown → HTML
- [ ] Syntax highlighting pour code blocks
- [ ] Image de couverture
- [ ] Métadonnées (date, tags, temps de lecture)
- [ ] Navigation précédent/suivant (optionnel)

### 5.1.2 SEO
- [ ] Meta tags dynamiques
- [ ] Open Graph tags
- [ ] Twitter cards

---

# PHASE 6 : POLISH & OPTIMISATIONS

## 6.1 Performance

### 6.1.1 Bundle optimization
- [ ] Vérifier le tree shaking
- [ ] Lazy loading des images
- [ ] Compression des assets

### 6.1.2 Lighthouse audit
- [ ] Score Performance > 90
- [ ] Score Accessibility > 90
- [ ] Score Best Practices > 90
- [ ] Score SEO > 90

## 6.2 Responsive Design

### 6.2.1 Breakpoints
- [ ] Mobile (< 640px)
- [ ] Tablet (640px - 1024px)
- [ ] Desktop (> 1024px)

### 6.2.2 Tests
- [ ] Tester sur plusieurs devices
- [ ] Corriger les problèmes d'overflow
- [ ] Vérifier les touch interactions

## 6.3 Accessibilité

### 6.3.1 ARIA
- [ ] Labels appropriés
- [ ] Roles sémantiques
- [ ] Focus management

### 6.3.2 Keyboard navigation
- [ ] Tab order logique
- [ ] Skip links
- [ ] Focus visible

## 6.4 Dark/Light Mode

### 6.4.1 ThemeContext
- [ ] Persistance localStorage
- [ ] Respect du prefers-color-scheme
- [ ] Transition smooth entre modes

### 6.4.2 Styles
- [ ] Vérifier tous les contrastes
- [ ] Images/assets adaptés aux deux modes

---

# PHASE 7 : DÉPLOIEMENT

## 7.1 CI/CD Frontend

### 7.1.1 GitHub Actions
- [ ] Workflow build + test
- [ ] Deploy vers Azure Blob Storage
- [ ] Purge CDN cache après deploy

### 7.1.2 Variables d'environnement
- [ ] VITE_API_URL
- [ ] VITE_AUTH0_DOMAIN
- [ ] VITE_AUTH0_CLIENT_ID
- [ ] VITE_AUTH0_AUDIENCE

## 7.2 CI/CD Backend

### 7.2.1 GitHub Actions
- [ ] Workflow build + test
- [ ] Deploy vers Azure Functions

### 7.2.2 Slots (optionnel)
- [ ] Slot staging pour tests
- [ ] Swap vers production

## 7.3 Custom Domain

### 7.3.1 Achat domaine
- [ ] Choisir le registrar (Namecheap, OVH, etc.)
- [ ] Acheter le domaine

### 7.3.2 Configuration DNS
- [ ] CNAME vers CDN endpoint
- [ ] Configurer SSL (Azure CDN managed certificate)
- [ ] Redirect HTTP → HTTPS

## 7.4 Monitoring

### 7.4.1 Application Insights
- [ ] Configurer les alertes
- [ ] Dashboard custom

### 7.4.2 Uptime monitoring
- [ ] Configurer Azure Availability Tests
- [ ] Ou service externe (UptimeRobot)

---

# PHASE 8 : DONNÉES & CONTENU

## 8.1 Contenu statique

### 8.1.1 Constantes TypeScript
- [ ] Remplir `personal-info.ts`
- [ ] Remplir `experiences.ts`
- [ ] Remplir `projects.ts`
- [ ] Remplir `skills.ts`

### 8.1.2 Traductions
- [ ] Compléter `fr/translation.json`
- [ ] Compléter `en/translation.json`

### 8.1.3 Assets
- [ ] Photo de profil optimisée
- [ ] Icônes technologies (si custom)
- [ ] Favicon et app icons

## 8.2 Premier article de blog (optionnel)

- [ ] Écrire un article de présentation
- [ ] Tester le flow complet (création → publication → affichage)

---

# RÉSUMÉ DES PHASES

| Phase | Description | Dépendances |
|-------|-------------|-------------|
| 0 | Setup Infrastructure Azure | Aucune |
| 1 | Setup Projet Frontend | Phase 0 |
| 2 | Frontend - Sections Publiques | Phase 1 |
| 3 | Backend - Azure Functions | Phase 0 |
| 4 | Frontend - Admin | Phase 2, 3 |
| 5 | Page Détail Blog | Phase 2, 3 |
| 6 | Polish & Optimisations | Phase 2-5 |
| 7 | Déploiement | Phase 6 |
| 8 | Données & Contenu | Phase 7 |

---

# ESTIMATION GLOBALE

**Phases parallélisables :**
- Phase 2 et 3 peuvent être faites en parallèle
- Phase 4 et 5 peuvent être faites en parallèle

**Ordre recommandé :**
1. Phase 0 (Infrastructure)
2. Phase 1 (Setup Frontend)
3. Phase 2 + 3 en parallèle (Frontend public + Backend)
4. Phase 4 + 5 en parallèle (Admin + Blog detail)
5. Phase 6 (Polish)
6. Phase 7 (Déploiement)
7. Phase 8 (Contenu)
