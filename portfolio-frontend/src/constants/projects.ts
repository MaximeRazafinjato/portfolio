export interface Project {
  id: string
  name: string
  description: {
    fr: string
    en: string
  }
  technologies: string[]
  githubUrl: string
  demoUrl?: string
  imageUrl?: string
  features: {
    fr: string[]
    en: string[]
  }
}

export const projects: Project[] = [
  {
    id: 'poc-keycloak',
    name: 'POC-Keycloak',
    description: {
      fr: 'Démonstration complète d\'une authentification OIDC avec .NET 9, React 19 et Keycloak',
      en: 'Complete OIDC authentication demo with .NET 9, React 19 and Keycloak',
    },
    technologies: ['.NET 9', 'React 19', 'TypeScript', 'Keycloak', 'Docker', 'SQL Server'],
    githubUrl: 'https://github.com/MaximeRazafinjato/POC-Keycloak',
    features: {
      fr: [
        'Login OIDC via Authorization Code avec PKCE',
        'Validation cryptographique des tokens JWT via JWKS',
        'Autorisations par rôles (admin/user)',
        'Single Logout avec purge de session',
      ],
      en: [
        'OIDC Login via Authorization Code with PKCE',
        'Cryptographic JWT token validation via JWKS',
        'Role-based authorization (admin/user)',
        'Single Logout with session purge',
      ],
    },
  },
  {
    id: 'poc-sig',
    name: 'POC-SIG',
    description: {
      fr: 'Plateforme GIS moderne pour visualiser et gérer des données géospatiales',
      en: 'Modern GIS platform to visualize and manage geospatial data',
    },
    technologies: ['React 18', 'TypeScript', 'Leaflet', '.NET 9', 'SQL Server', 'Docker'],
    githubUrl: 'https://github.com/MaximeRazafinjato/POC-SIG',
    features: {
      fr: [
        'Export GeoJSON/CSV',
        'Sélection spatiale multi-couches',
        'Mode sombre/clair avec glassmorphism',
      ],
      en: [
        'GeoJSON/CSV export',
        'Multi-layer spatial selection',
        'Dark/light mode with glassmorphism',
      ],
    },
  },
  {
    id: 'poc-mindmap',
    name: 'POC Mindmap',
    description: {
      fr: 'Application web de visualisation de graphes depuis des fichiers Excel',
      en: 'Web app for graph visualization from Excel files',
    },
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    githubUrl: 'https://github.com/MaximeRazafinjato/poc-mindmap',
    features: {
      fr: [
        'Conversion de données tabulaires en mindmap',
        'Représentations graphiques interactives',
      ],
      en: [
        'Tabular data to mindmap conversion',
        'Interactive graph representations',
      ],
    },
  },
  {
    id: 'afk-trade',
    name: 'AFKTradeNotification',
    description: {
      fr: 'App console .NET pour surveiller les logs de Path of Exile et notifier les trades via Discord',
      en: '.NET console app to monitor Path of Exile logs and send trade notifications via Discord',
    },
    technologies: ['.NET 8', 'Discord API', 'Regex'],
    githubUrl: 'https://github.com/MaximeRazafinjato/AFKTradeNotification',
    features: {
      fr: [
        'Surveillance des logs en temps réel',
        'Notifications Discord automatiques pour les joueurs AFK',
      ],
      en: [
        'Real-time log monitoring',
        'Automatic Discord notifications for AFK players',
      ],
    },
  },
]
