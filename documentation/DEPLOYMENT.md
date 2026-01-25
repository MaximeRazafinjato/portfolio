# Guide de Déploiement - Portfolio Maxime Razafinjato

Ce document décrit l'architecture et le processus de déploiement complet du portfolio sur Azure avec CI/CD GitHub Actions.

---

## Table des matières

1. [Architecture Globale](#1-architecture-globale)
2. [Ressources Azure](#2-ressources-azure)
3. [CI/CD avec GitHub Actions](#3-cicd-avec-github-actions)
4. [Base de Données](#4-base-de-données)
5. [Authentification Auth0](#5-authentification-auth0)
6. [Domaine Personnalisé](#6-domaine-personnalisé)
7. [URLs et Endpoints](#7-urls-et-endpoints)
8. [Secrets et Credentials](#8-secrets-et-credentials)
9. [Commandes Utiles](#9-commandes-utiles)
10. [Dépannage](#10-dépannage)

---

## 1. Architecture Globale

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              UTILISATEUR                                     │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         CLOUDFLARE (CDN/Proxy)                               │
│  • SSL/TLS gratuit                                                           │
│  • Cache                                                                     │
│  • Protection DDoS                                                           │
│  • Domaine: maxime-razafinjato.fr                                           │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    ▼                               ▼
┌───────────────────────────────┐   ┌───────────────────────────────┐
│      FRONTEND (React)         │   │      BACKEND (.NET 9)         │
│  Azure Blob Storage           │   │   Azure Functions             │
│  Static Website Hosting       │   │   Consumption Plan            │
│                               │   │                               │
│  URL: stportfoliomaxime.      │   │  URL: func-portfolio-maxime.  │
│       z1.web.core.windows.net │   │       azurewebsites.net/api   │
└───────────────────────────────┘   └───────────────────────────────┘
                                                    │
                                                    ▼
                                    ┌───────────────────────────────┐
                                    │      BASE DE DONNÉES          │
                                    │   Azure SQL Database          │
                                    │   (Basic tier)                │
                                    │                               │
                                    │  Server: sql-portfolio-maxime │
                                    │  DB: sqldb-portfolio          │
                                    └───────────────────────────────┘
```

### Flux de données

1. **Visiteur** accède à `https://maxime-razafinjato.fr`
2. **Cloudflare** reçoit la requête, applique le SSL et le cache
3. **Frontend** (React SPA) est servi depuis Azure Blob Storage
4. **Frontend** appelle l'API backend pour les données dynamiques
5. **Backend** (Azure Functions) traite les requêtes et interroge la BDD
6. **Azure SQL** stocke les articles et messages de contact

---

## 2. Ressources Azure

Toutes les ressources sont dans le **Resource Group** `rg-portfolio-maxime` en région **Sweden Central**.

### 2.1 Vue d'ensemble

| Ressource | Nom | Type | Coût estimé |
|-----------|-----|------|-------------|
| Resource Group | `rg-portfolio-maxime` | Conteneur logique | Gratuit |
| SQL Server | `sql-portfolio-maxime` | Serveur SQL logique | Gratuit |
| SQL Database | `sqldb-portfolio` | Basic (5 DTU) | ~5€/mois |
| Storage Account | `stportfoliomaxime` | StorageV2 (LRS) | ~0.02€/mois |
| Storage Account | `stportfoliofunc` | StorageV2 (LRS) | ~0.02€/mois |
| Function App | `func-portfolio-maxime` | Consumption Plan | Pay-per-use (~gratuit) |
| App Service Plan | `SwedenCentralLinuxDynamicPlan` | Consumption | Inclus |
| Application Insights | `func-portfolio-maxime` | Monitoring | Gratuit (5GB/mois) |

### 2.2 Storage Account Frontend (`stportfoliomaxime`)

**Rôle** : Héberger le frontend React comme site statique.

**Configuration** :
- **Static Website** : Activé
- **Index document** : `index.html`
- **Error document** : `index.html` (pour le routing SPA)
- **URL publique** : `https://stportfoliomaxime.z1.web.core.windows.net`

**Comment ça marche** :
- Azure Blob Storage peut servir des fichiers statiques directement via HTTP
- Le conteneur `$web` est spécial : son contenu est servi comme un site web
- Parfait pour les SPA (Single Page Applications) car peu coûteux et scalable

### 2.3 Azure Functions (`func-portfolio-maxime`)

**Rôle** : Héberger l'API backend .NET 9.

**Configuration** :
- **Runtime** : .NET 9 Isolated
- **OS** : Linux
- **Plan** : Consumption (serverless)
- **URL** : `https://func-portfolio-maxime.azurewebsites.net/api`

**Comment ça marche** :
- Les Azure Functions sont des fonctions serverless
- Elles démarrent à la demande (cold start possible)
- Facturation à l'exécution (très économique pour faible trafic)
- Le plan Consumption scale automatiquement

**App Settings configurés** :
```
Auth0__Domain = maxime-razafinjato.eu.auth0.com
Auth0__Audience = https://cv-web-api
Cors__AllowedOrigins__0 = https://stportfoliomaxime.z1.web.core.windows.net
ConnectionStrings__PortfolioDb = Server=tcp:sql-portfolio-maxime.database.windows.net,...
```

### 2.4 Azure SQL Database

**Rôle** : Stocker les données persistantes (articles, messages de contact).

**Configuration** :
- **Server** : `sql-portfolio-maxime.database.windows.net`
- **Database** : `sqldb-portfolio`
- **Tier** : Basic (5 DTU, 2GB)
- **Admin** : `portfolioadmin`

**Firewall Rules** :
- `AllowAzureServices` : Autorise les services Azure (0.0.0.0)
- `AllowMyIP` : Autorise ton IP pour les migrations locales

**Tables créées** (via EF Core Migrations) :
- `Articles` : Blog posts
- `ContactMessages` : Messages du formulaire de contact
- `__EFMigrationsHistory` : Historique des migrations

---

## 3. CI/CD avec GitHub Actions

### 3.1 Pourquoi GitHub Actions ?

Azure DevOps n'était pas accessible (restrictions compte étudiant), donc on utilise GitHub Actions qui est :
- Gratuit pour les repos publics
- Intégré directement à GitHub
- 2000 minutes/mois gratuites pour les repos privés

### 3.2 Workflow Backend (`.github/workflows/deploy-backend.yml`)

**Déclencheurs** :
- Push sur `master` avec changements dans `portfolio-backend/**`
- Déclenchement manuel (`workflow_dispatch`)

**Étapes** :
```yaml
1. Checkout        → Récupère le code source
2. Setup .NET 9    → Installe le SDK .NET
3. Restore         → Restaure les packages NuGet
4. Build           → Compile en mode Release
5. Publish         → Crée le package de déploiement
6. Deploy          → Déploie sur Azure Functions via publish profile
```

**Secrets utilisés** :
- `AZURE_FUNCTIONAPP_PUBLISH_PROFILE` : Credentials de déploiement

### 3.3 Workflow Frontend (`.github/workflows/deploy-frontend.yml`)

**Déclencheurs** :
- Push sur `master` avec changements dans `portfolio-frontend/**`
- Déclenchement manuel

**Étapes** :
```yaml
1. Checkout           → Récupère le code source
2. Setup Node.js 20   → Installe Node.js
3. Setup pnpm         → Installe pnpm
4. Install deps       → pnpm install
5. Build              → pnpm build (avec variables d'environnement)
6. Upload to Blob     → Envoie les fichiers dans le conteneur $web
```

**Variables d'environnement injectées au build** :
```
VITE_API_URL = https://func-portfolio-maxime.azurewebsites.net/api
VITE_AUTH0_DOMAIN = maxime-razafinjato.eu.auth0.com
VITE_AUTH0_CLIENT_ID = (depuis secret)
VITE_AUTH0_AUDIENCE = https://cv-web-api
```

**Secrets utilisés** :
- `AUTH0_CLIENT_ID` : ID de l'application Auth0
- `AZURE_STORAGE_CONNECTION_STRING` : Connection string du storage account

### 3.4 Déclenchement des workflows

Les workflows se déclenchent automatiquement quand :
- Tu push sur `master`
- Les fichiers modifiés sont dans le dossier concerné (`paths`)

Pour déclencher manuellement :
1. GitHub → Actions → Sélectionner le workflow
2. "Run workflow" → "Run workflow"

---

## 4. Base de Données

### 4.1 Entity Framework Core

Le projet utilise EF Core avec l'approche **Code First** :
- Les entités C# définissent le schéma
- Les migrations génèrent le SQL
- La BDD est créée/mise à jour automatiquement

**Projets impliqués** :
- `Portfolio.Core` : Entités (Article, ContactMessage)
- `Portfolio.Infrastructure` : DbContext, Repositories, Migrations

### 4.2 Appliquer les migrations

**En local** (vers Azure SQL) :
```powershell
cd portfolio-backend
dotnet ef database update `
  --project Portfolio.Infrastructure `
  --startup-project Portfolio.Functions `
  --connection "Server=tcp:sql-portfolio-maxime.database.windows.net,1433;Database=sqldb-portfolio;User ID=portfolioadmin;Password=<PASSWORD>;Encrypt=True;TrustServerCertificate=False;"
```

**Générer une nouvelle migration** :
```powershell
dotnet ef migrations add NomDeLaMigration `
  --project Portfolio.Infrastructure `
  --startup-project Portfolio.Functions
```

### 4.3 Firewall SQL

Pour exécuter des migrations depuis ta machine, ton IP doit être autorisée :
```powershell
az sql server firewall-rule create `
  --name AllowMyIP `
  --resource-group rg-portfolio-maxime `
  --server sql-portfolio-maxime `
  --start-ip-address <TON_IP> `
  --end-ip-address <TON_IP>
```

---

## 5. Authentification Auth0

### 5.1 Configuration

**Tenant** : `maxime-razafinjato.eu.auth0.com`
**Application** : Single Page Application

**URLs configurées dans Auth0 Dashboard** :

| Setting | URLs |
|---------|------|
| Allowed Callback URLs | `http://localhost:5173`, `http://localhost:5173/admin`, `https://stportfoliomaxime.z1.web.core.windows.net`, `https://stportfoliomaxime.z1.web.core.windows.net/admin`, `https://maxime-razafinjato.fr`, `https://maxime-razafinjato.fr/admin`, `https://www.maxime-razafinjato.fr`, `https://www.maxime-razafinjato.fr/admin` |
| Allowed Logout URLs | `http://localhost:5173`, `https://stportfoliomaxime.z1.web.core.windows.net`, `https://maxime-razafinjato.fr`, `https://www.maxime-razafinjato.fr` |
| Allowed Web Origins | `http://localhost:5173`, `https://stportfoliomaxime.z1.web.core.windows.net`, `https://maxime-razafinjato.fr`, `https://www.maxime-razafinjato.fr` |

### 5.2 Flux d'authentification

```
1. User clique "Login"
2. Redirect vers Auth0 (authorize endpoint)
3. User se connecte (email/password ou social)
4. Auth0 redirect vers callback URL avec code
5. Frontend échange le code contre des tokens
6. Access token envoyé au backend dans le header Authorization
7. Backend valide le JWT avec la clé publique Auth0
```

### 5.3 API Auth0

**Audience** : `https://cv-web-api`

Le backend vérifie que :
- Le token est signé par Auth0
- L'audience correspond
- Le token n'est pas expiré

---

## 6. Domaine Personnalisé

### 6.1 Architecture DNS

```
maxime-razafinjato.fr
        │
        ▼ (Nameservers)
   CLOUDFLARE
        │
        ▼ (CNAME)
stportfoliomaxime.z1.web.core.windows.net
        │
        ▼
   AZURE BLOB STORAGE
```

### 6.2 Pourquoi Cloudflare ?

- **Gratuit** : Plan Free suffisant
- **SSL/TLS** : Certificat HTTPS automatique
- **CDN** : Cache global pour performances
- **Protection** : DDoS, WAF basique
- **CNAME Flattening** : Permet CNAME sur domaine apex (@)

### 6.3 Configuration Cloudflare

**Nameservers** (configurés chez OVH) :
- `adam.ns.cloudflare.com` (exemple)
- `bella.ns.cloudflare.com` (exemple)

**Enregistrements DNS** :

| Type | Name | Content | Proxy |
|------|------|---------|-------|
| CNAME | `@` | `stportfoliomaxime.z1.web.core.windows.net` | Proxied ☁️ |
| CNAME | `www` | `stportfoliomaxime.z1.web.core.windows.net` | Proxied ☁️ |
| MX | `@` | `mx1.mail.ovh.net` | DNS only |
| MX | `@` | `mx2.mail.ovh.net` | DNS only |
| MX | `@` | `mx3.mail.ovh.net` | DNS only |

**SSL/TLS Mode** : Full (recommandé)

### 6.4 Registrar OVH

**Domaine** : `maxime-razafinjato.fr`
**Nameservers** : Délégués à Cloudflare

---

## 7. URLs et Endpoints

### 7.1 URLs de production

| Service | URL |
|---------|-----|
| Frontend (domaine) | https://maxime-razafinjato.fr |
| Frontend (www) | https://www.maxime-razafinjato.fr |
| Frontend (Azure) | https://stportfoliomaxime.z1.web.core.windows.net |
| Backend API | https://func-portfolio-maxime.azurewebsites.net/api |
| SQL Server | sql-portfolio-maxime.database.windows.net |

### 7.2 Endpoints API

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| GET | `/api/articles` | Liste des articles | Non |
| GET | `/api/articles/{id}` | Détail d'un article | Non |
| POST | `/api/articles` | Créer un article | Oui |
| PUT | `/api/articles/{id}` | Modifier un article | Oui |
| DELETE | `/api/articles/{id}` | Supprimer un article | Oui |
| POST | `/api/contact` | Envoyer un message | Non |

---

## 8. Secrets et Credentials

### 8.1 GitHub Secrets

| Secret | Description | Où le trouver |
|--------|-------------|---------------|
| `AUTH0_CLIENT_ID` | ID application Auth0 | Auth0 Dashboard → Applications → Settings |
| `AZURE_FUNCTIONAPP_PUBLISH_PROFILE` | XML de déploiement | `az functionapp deployment list-publishing-profiles --name func-portfolio-maxime --resource-group rg-portfolio-maxime --xml` |
| `AZURE_STORAGE_CONNECTION_STRING` | Connection string storage | `az storage account show-connection-string --name stportfoliomaxime --resource-group rg-portfolio-maxime --query connectionString -o tsv` |

### 8.2 Azure App Settings

Configurés via Azure CLI ou Portal :
```powershell
az functionapp config appsettings list `
  --name func-portfolio-maxime `
  --resource-group rg-portfolio-maxime
```

### 8.3 Credentials sensibles

| Credential | Localisation |
|------------|--------------|
| SQL Admin Password | Azure Portal / deploy/azure-resources.ps1 |
| Auth0 Client Secret | Auth0 Dashboard (non utilisé côté client) |
| Storage Account Keys | `az storage account keys list --account-name stportfoliomaxime` |

---

## 9. Commandes Utiles

### 9.1 Azure CLI

```powershell
# Se connecter à Azure
az login

# Voir les ressources du groupe
az resource list --resource-group rg-portfolio-maxime --output table

# Logs de la Function App
az functionapp log tail --name func-portfolio-maxime --resource-group rg-portfolio-maxime

# Redémarrer la Function App
az functionapp restart --name func-portfolio-maxime --resource-group rg-portfolio-maxime

# Voir les App Settings
az functionapp config appsettings list --name func-portfolio-maxime --resource-group rg-portfolio-maxime

# Ajouter une origine CORS
az functionapp cors add --name func-portfolio-maxime --resource-group rg-portfolio-maxime --allowed-origins "https://example.com"

# Voir le contenu du storage
az storage blob list --account-name stportfoliomaxime --container-name '$web' --output table
```

### 9.2 Déploiement manuel

**Frontend** :
```powershell
cd portfolio-frontend
pnpm build
az storage blob upload-batch `
  --destination '$web' `
  --source dist `
  --account-name stportfoliomaxime `
  --overwrite
```

**Backend** :
```powershell
cd portfolio-backend
dotnet publish Portfolio.Functions -c Release -o ./publish
# Puis zipper et uploader via Azure Portal ou func CLI
```

### 9.3 Base de données

```powershell
# Appliquer les migrations
cd portfolio-backend
dotnet ef database update --project Portfolio.Infrastructure --startup-project Portfolio.Functions

# Générer le script SQL
dotnet ef migrations script --project Portfolio.Infrastructure --startup-project Portfolio.Functions --output migrations.sql
```

---

## 10. Dépannage

### 10.1 Le frontend ne charge pas

1. Vérifier que le Static Website est activé sur le storage account
2. Vérifier que `index.html` existe dans le conteneur `$web`
3. Vérifier les DNS (Cloudflare) pointent vers la bonne URL

### 10.2 Erreur CORS

```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution** :
```powershell
az functionapp cors add --name func-portfolio-maxime --resource-group rg-portfolio-maxime --allowed-origins "https://ton-domaine.com"
```

### 10.3 Erreur Auth0 "Callback URL mismatch"

**Solution** : Ajouter l'URL exacte dans Auth0 Dashboard → Application URIs → Allowed Callback URLs

### 10.4 Erreur SQL "IP not allowed"

**Solution** :
```powershell
# Trouver ton IP
curl ifconfig.me

# Ajouter la règle firewall
az sql server firewall-rule create --name AllowMyIP --resource-group rg-portfolio-maxime --server sql-portfolio-maxime --start-ip-address <IP> --end-ip-address <IP>
```

### 10.5 Le workflow GitHub échoue

1. Vérifier les secrets dans GitHub → Settings → Secrets
2. Vérifier les logs dans l'onglet Actions
3. S'assurer que le publish profile n'a pas expiré

### 10.6 Cold Start lent sur Azure Functions

C'est normal avec le plan Consumption. La première requête après inactivité peut prendre 5-10 secondes.

**Solutions** :
- Accepter le cold start (gratuit)
- Passer au plan Premium (payant, toujours warm)
- Configurer un ping régulier (pas recommandé)

---

## Annexes

### A. Structure des fichiers de déploiement

```
cv/
├── .github/
│   └── workflows/
│       ├── deploy-backend.yml    # CI/CD backend
│       └── deploy-frontend.yml   # CI/CD frontend
├── deploy/
│   ├── azure-resources.ps1       # Script création ressources Azure
│   ├── azure-cdn.ps1             # Script CDN (non utilisé)
│   └── apply-migrations.ps1      # Script migrations EF Core
├── portfolio-backend/
│   └── ...
├── portfolio-frontend/
│   ├── .env.production.example   # Variables d'env de production
│   └── ...
└── docs/
    └── DEPLOYMENT.md             # Ce fichier
```

### B. Coûts mensuels estimés

| Service | Coût |
|---------|------|
| Azure SQL Basic | ~5€ |
| Azure Functions (Consumption) | ~0€ (faible trafic) |
| Azure Storage | ~0.05€ |
| Cloudflare | Gratuit |
| Domaine .fr (OVH) | ~7€/an |
| **Total** | **~5-6€/mois** |

### C. Pour aller plus loin

- [ ] Ajouter un domaine personnalisé pour l'API (`api.maxime-razafinjato.fr`)
- [ ] Configurer des alertes Azure Monitor
- [ ] Ajouter des tests automatisés dans les workflows
- [ ] Mettre en place un environnement de staging
- [ ] Configurer les backups automatiques SQL

---

*Dernière mise à jour : 25 janvier 2026*
