export interface SkillCategory {
  id: string
  nameKey: string
  skills: string[]
}

export const technicalSkills: SkillCategory[] = [
  {
    id: 'development',
    nameKey: 'skills.categories.development',
    skills: ['.NET', 'C#', 'ASP.NET', 'React', 'TypeScript', 'JavaScript', 'SQL', 'Git'],
  },
  {
    id: 'testing',
    nameKey: 'skills.categories.testing',
    skills: ['Selenium', 'Playwright', 'xUnit', 'Locust', 'Tests manuels'],
  },
  {
    id: 'devops',
    nameKey: 'skills.categories.devops',
    skills: ['GitLab CI', 'Docker', 'Azure DevOps'],
  },
  {
    id: 'cloud',
    nameKey: 'skills.categories.cloud',
    skills: ['Azure OpenAI', 'Azure AI Foundry', 'RAG'],
  },
  {
    id: 'management',
    nameKey: 'skills.categories.management',
    skills: ['JIRA', 'Agile', 'SCRUM'],
  },
  {
    id: 'tools',
    nameKey: 'skills.categories.tools',
    skills: ['VS Code', 'Rider', 'Postman', 'Insomnia', 'Notion', 'Confluence', 'GitHub Copilot', 'Claude', 'ChatGPT'],
  },
]

export const softSkills = [
  {
    name: { fr: 'Esprit d\'analyse', en: 'Analytical thinking' },
  },
  {
    name: { fr: 'Communication', en: 'Communication' },
  },
  {
    name: { fr: 'Collaboration Dev/QA', en: 'Dev/QA Collaboration' },
  },
  {
    name: { fr: 'Adaptabilité', en: 'Adaptability' },
  },
  {
    name: { fr: 'Autonomie', en: 'Autonomy' },
  },
  {
    name: { fr: 'Résolution de problèmes', en: 'Problem solving' },
  },
  {
    name: { fr: 'Curiosité technique', en: 'Technical curiosity' },
  },
]
