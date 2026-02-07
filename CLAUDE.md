# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Portfolio personnel bilingue (FR/EN) — site CV de Maxime Razafinjato. Monorepo avec un frontend React et un backend .NET 9 Azure Functions, déployés respectivement sur Vercel et Azure.

## Commands

### Frontend (`portfolio-frontend/`)

```bash
pnpm install          # Installer les dépendances (TOUJOURS pnpm, jamais npm/yarn)
pnpm dev              # Serveur de dev (port 5173)
pnpm build            # Build production (tsc + vite)
pnpm lint             # ESLint
pnpm preview          # Prévisualiser le build
```

### Backend (`portfolio-backend/`)

```bash
dotnet restore portfolio-backend/Portfolio.sln
dotnet build portfolio-backend/Portfolio.sln
dotnet run --project portfolio-backend/Portfolio.Functions

# EF Core migrations (depuis portfolio-backend/)
dotnet ef migrations add <Name> --project Portfolio.Infrastructure --startup-project Portfolio.Functions
dotnet ef database update --project Portfolio.Infrastructure --startup-project Portfolio.Functions
```

## Architecture

### Frontend — React 19 + TypeScript + Vite + Tailwind 4

**Stack :** React 19, TypeScript 5.9, Vite 7 (rolldown), Tailwind CSS 4, TanStack Query, React Router 7, React Hook Form + Zod, Auth0, i18next, Framer Motion, shadcn/ui (style new-york, Radix UI + Lucide icons).

**Structure clé :**
- `src/components/ui/` — Primitives UI (shadcn/ui)
- `src/components/features/` — Composants par feature (About, Admin, Blog, Contact, Experience)
- `src/components/layout/` — Layouts
- `src/pages/` — Pages routées (HomePage, blog/, admin/)
- `src/domains/` — Logique métier par domaine (blog, career, files, portfolio, profile), chaque domaine expose `queries.ts`, `mutations.ts`, `types.ts`, `constants.ts`
- `src/lib/api.ts` — Instance Axios + `API_ENDPOINTS` (toutes les routes API centralisées)
- `src/configs/` — Auth0, i18n, routes
- `src/locales/` — Traductions FR/EN (fichiers JSON)

**Patterns importants :**
- Path alias `@/` → `src/`
- Routing avec lazy loading (`React.lazy` + `Suspense`)
- Auth0 pour l'authentification (token Bearer via `setAuthToken()`)
- i18n : français par défaut, anglais en secondaire
- shadcn/ui configuré via `components.json` (style new-york, CSS variables, Lucide icons)

### Backend — Clean Architecture .NET 9 Azure Functions

**4 projets :**

| Projet | Rôle |
|---|---|
| `Portfolio.Core` | Entités du domaine + interfaces (repositories, services) |
| `Portfolio.Application` | Cas d'usage (Service + Validator + Model par feature) |
| `Portfolio.Infrastructure` | EF Core 9 (SQL Server), repositories, Azure Blob Storage |
| `Portfolio.Functions` | Azure Functions v4 Isolated — HTTP triggers, middleware JWT, CORS |

**Domaines métier :** Blog (Articles), Career (Experience, Education), Contact, Portfolio (Projects, Skills, SkillCategories, SoftSkills), Profile (PersonalInfo, SocialLinks, Languages), Files.

**Patterns importants :**
- Chaque use case = dossier avec `Service.cs` + `Validator.cs` + `Model.cs`
- Repository Pattern + UnitOfWork
- Middleware pipeline : `ExceptionHandlingMiddleware` → `JwtAuthenticationMiddleware`
- Migrations EF Core appliquées automatiquement au démarrage (`ApplyMigrations()`)
- DI centralisée dans `DependencyInjection.cs` (Application + Infrastructure)
- Contenu bilingue au niveau entité (pattern `TitleFr`/`TitleEn`)

## Deployment

- **Frontend :** Vercel (auto-deploy depuis master, root = `portfolio-frontend/`)
- **Backend :** Azure Functions via GitHub Actions (`.github/workflows/deploy-backend.yml`, trigger sur push master dans `portfolio-backend/**`)
- **Database :** Azure SQL (auto-migration au startup)
- **Storage :** Azure Blob Storage (fichiers uploadés)
- **Auth :** Auth0 (SPA + JWT)

## Environment Variables

### Frontend (`.env`)
```
VITE_API_URL=http://localhost:7071/api
VITE_AUTH0_DOMAIN=<tenant>.auth0.com
VITE_AUTH0_CLIENT_ID=<client-id>
VITE_AUTH0_AUDIENCE=https://cv-web-api
```

### Backend (`local.settings.json`)
```
ConnectionStrings__PortfolioDb=<connection-string>
Auth0__Domain=<tenant>.auth0.com
Auth0__Audience=https://cv-web-api
Cors__AllowedOrigins=http://localhost:5173
```
