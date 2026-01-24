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

### ❌ Phases restantes
- **Phase 3** : Backend - Azure Functions (.NET 9)
- **Phase 4** : Frontend - Admin (Blog editor)
- **Phase 5** : Page détail Blog
- **Phase 6** : Polish & Optimisations
- **Phase 7** : Déploiement Azure
- **Phase 8** : Contenu (données, traductions, assets)

---

## Ce qui a fonctionné

1. **pnpm** : Gestionnaire de paquets utilisé selon les guidelines
2. **ShadCN UI init** : Nécessitait d'abord configurer Tailwind et les alias tsconfig
3. **Tailwind CSS v4** : Utilise `@import "tailwindcss"` et `@tailwindcss/vite` plugin
4. **Thème violet** : Configuré via CSS variables OKLCH dans `index.css`
5. **Structure modulaire** : Dossiers par feature, un composant par fichier, sous-composants dans `_components/`
6. **Framer Motion** : Animations fluides avec variants réutilisables
7. **TypeScript** : Build sans erreurs

---

## Ce qui n'a pas fonctionné

1. **ShadCN init sans config préalable** : Erreur si Tailwind et alias tsconfig ne sont pas configurés d'abord
2. **Toast component** : Déprécié, utiliser `sonner` à la place
3. **Options shadcn obsolètes** : `--style` n'existe plus, utiliser `-t vite -b neutral`

---

## Prochaines étapes

### Phase 3 - Backend Azure Functions (PRIORITAIRE)

1. **Setup projet .NET 9**
   - Créer `portfolio-backend/` avec Azure Functions
   - Configurer Entity Framework Core + Azure SQL
   - Configurer Auth0 pour authentification JWT

2. **API Blog**
   - `GET /api/articles` - Liste des articles publiés
   - `GET /api/articles/{slug}` - Détail article
   - `POST /api/articles` - Créer article (admin)
   - `PUT /api/articles/{id}` - Modifier article (admin)
   - `DELETE /api/articles/{id}` - Supprimer article (admin)

3. **API Contact**
   - `POST /api/contact` - Envoyer message (stockage + email notification)

### Commandes pour continuer

```bash
cd D:\Projects\FTEL\cv\portfolio-frontend
pnpm dev
```

Le site est accessible sur http://localhost:5173

---

## Fichiers de référence importants

| Fichier | Description |
|---------|-------------|
| `PLAN_PORTFOLIO.md` | Plan complet du contenu et specs techniques |
| `IMPLEMENTATION_PLAN.md` | Plan d'implémentation détaillé en 8 phases |
| `src/constants/*.ts` | Toutes les données (expériences, projets, skills) |
| `src/locales/*/translation.json` | Traductions FR/EN |
| `src/index.css` | Thème violet avec variables CSS |
| `src/constants/animations.ts` | Variants Framer Motion réutilisables |

---

## Décisions techniques prises

1. **React Router v7** avec lazy loading pour les pages
2. **Tailwind CSS v4** avec plugin Vite (pas de tailwind.config.js)
3. **ShadCN UI** style New York, base neutral customisé en violet
4. **Framer Motion** pour les animations (variants déjà définis dans `constants/animations.ts`)
5. **i18next** avec détection automatique de langue (localStorage + navigator)
6. **Auth0** pour l'authentification admin (à configurer avec les vraies credentials)
7. **Azure Functions** pour le backend (Phase 3)
8. **Structure des composants** : un composant par fichier, sous-composants dans `_components/`
9. **Lucide React** pour les icônes
10. **Sonner** pour les notifications toast

---

## Notes pour le prochain agent

- Lire le module `~/.claude/modules/FRONTEND_ARCHITECTURE.md` avant de coder
- Utiliser Context7 MCP pour la documentation des librairies
- Utiliser `pnpm` (pas npm/yarn)
- Les données sont déjà dans `src/constants/` - pas besoin de les recréer
- Le thème violet est configuré via CSS variables OKLCH
- Les animations Framer Motion sont dans `src/constants/animations.ts`
- Structure : un composant par fichier, sous-composants dans `_components/`
