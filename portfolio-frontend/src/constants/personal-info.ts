export const personalInfo = {
  name: 'Maxime Razafinjato',
  title: {
    fr: 'Responsable QA & Développeur Full-Stack',
    en: 'QA Lead & Full-Stack Developer',
  },
  email: 'maximerazafinjato@gmail.com',
  phone: '+33 7 61 38 40 72',
  location: {
    city: 'Rouen',
    country: {
      fr: 'France',
      en: 'France',
    },
  },
  social: {
    linkedin: 'https://www.linkedin.com/in/maxime-razafinjato',
    github: 'https://github.com/MaximeRazafinjato',
  },
  languages: [
    { name: { fr: 'Français', en: 'French' }, level: 'native' },
    { name: { fr: 'Anglais', en: 'English' }, level: 'fluent' },
    { name: { fr: 'Allemand', en: 'German' }, level: 'intermediate' },
    { name: { fr: 'Malgache', en: 'Malagasy' }, level: 'basic' },
  ],
} as const

export const timeline = [
  {
    year: '2011-2017',
    location: {
      fr: 'Tananarive, Madagascar & Dakar, Sénégal',
      en: 'Antananarivo, Madagascar & Dakar, Senegal',
    },
    description: {
      fr: 'Collège et Lycée - Baccalauréat Scientifique',
      en: 'Middle and High School - Scientific Baccalaureate',
    },
    flag: '🇲🇬',
  },
  {
    year: '2017-2020',
    location: {
      fr: 'Île Maurice',
      en: 'Mauritius',
    },
    description: {
      fr: 'Supinfo International University - Bachelor of Science',
      en: 'Supinfo International University - Bachelor of Science',
    },
    flag: '🇲🇺',
  },
  {
    year: '2021-2023',
    location: {
      fr: 'Rouen, France',
      en: 'Rouen, France',
    },
    description: {
      fr: 'CESI - Master Manager en Architecture et Applications Logicielles',
      en: 'CESI - Master in Software Architecture and Applications',
    },
    flag: '🇫🇷',
  },
  {
    year: '2023-now',
    location: {
      fr: 'Rouen, France',
      en: 'Rouen, France',
    },
    description: {
      fr: 'FTEL - Responsable Assurance Qualité',
      en: 'FTEL - QA Lead',
    },
    flag: '🇫🇷',
  },
] as const
