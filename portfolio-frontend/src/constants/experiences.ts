export interface Experience {
  id: string
  company: string
  companyType: {
    fr: string
    en: string
  }
  location: {
    fr: string
    en: string
  }
  title: {
    fr: string
    en: string
  }
  period: {
    start: string
    end: string | null
  }
  responsibilities: {
    fr: string[]
    en: string[]
  }
  technologies: string[]
}

export const experiences: Experience[] = [
  {
    id: 'ftel-qa',
    company: 'FTEL',
    companyType: {
      fr: 'ESN / Consulting IT',
      en: 'IT Consulting',
    },
    location: {
      fr: 'Rouen, France',
      en: 'Rouen, France',
    },
    title: {
      fr: 'Responsable Assurance Qualité',
      en: 'QA Lead',
    },
    period: {
      start: '2023',
      end: null,
    },
    responsibilities: {
      fr: [
        'Établissement d\'une stratégie de test complète de zéro',
        'Écriture de tests unitaires, d\'intégration et end-to-end',
        'Automatisation des tests dans GitLab CI sous Docker',
        'Formation des équipes dev aux bonnes pratiques QA',
        'Documentation : Plan d\'Assurance Qualité, Cahier de recette',
        'Gestion de projet interne et TMA',
      ],
      en: [
        'Building a complete test strategy from scratch',
        'Writing unit, integration and end-to-end tests',
        'Test automation in GitLab CI with Docker',
        'Training dev teams on QA best practices',
        'Documentation: Quality Assurance Plan, Test books',
        'Internal project management and maintenance',
      ],
    },
    technologies: ['Selenium', 'Playwright', 'xUnit', 'Locust', 'GitLab CI', 'Docker'],
  },
  {
    id: 'ftel-dev',
    company: 'FTEL',
    companyType: {
      fr: 'ESN / Consulting IT',
      en: 'IT Consulting',
    },
    location: {
      fr: 'Rouen, France',
      en: 'Rouen, France',
    },
    title: {
      fr: 'Développeur Web - Alternant',
      en: 'Web Developer - Apprentice',
    },
    period: {
      start: '2021',
      end: '2023',
    },
    responsibilities: {
      fr: [
        'Analyse et conception de solutions techniques',
        'Évolution, suivi et maintien des applications existantes',
        'Conduite de réunions avec des clients',
      ],
      en: [
        'Analysis and design of technical solutions',
        'Evolution, monitoring and maintenance of existing applications',
        'Leading client meetings',
      ],
    },
    technologies: ['.NET', 'React', 'SQL Server', 'Git'],
  },
  {
    id: 'unicity',
    company: 'Unicity',
    companyType: {
      fr: 'Entreprise',
      en: 'Company',
    },
    location: {
      fr: 'Île Maurice',
      en: 'Mauritius',
    },
    title: {
      fr: 'Analyste Web - Stagiaire',
      en: 'Web Analyst - Intern',
    },
    period: {
      start: '2020',
      end: '2020',
    },
    responsibilities: {
      fr: [
        'Réalisation d\'un site de covoiturage (architecture SOA)',
        'Utilisation d\'Azure DevOps',
        'Développement d\'API REST en .NET',
      ],
      en: [
        'Development of a carpooling website (SOA architecture)',
        'Using Azure DevOps',
        'REST API development in .NET',
      ],
    },
    technologies: ['.NET', 'Azure DevOps', 'SOA'],
  },
  {
    id: 'accenture',
    company: 'Accenture',
    companyType: {
      fr: 'Consulting',
      en: 'Consulting',
    },
    location: {
      fr: 'Île Maurice',
      en: 'Mauritius',
    },
    title: {
      fr: 'Développeur .NET - Stagiaire',
      en: '.NET Developer - Intern',
    },
    period: {
      start: '2019',
      end: '2019',
    },
    responsibilities: {
      fr: [
        'Réalisation d\'un chatbot avec Azure Bot Service et LUIS.ai',
        'Site interne générant des CV basés sur le modèle de l\'entreprise',
      ],
      en: [
        'Development of a chatbot with Azure Bot Service and LUIS.ai',
        'Internal website generating CVs based on company template',
      ],
    },
    technologies: ['Azure Bot Service', 'LUIS.ai', 'Node.js', 'HTML', 'CSS'],
  },
]
