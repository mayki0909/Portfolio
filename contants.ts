import { IProject } from './interfaces';
export const projects: IProject[] = [
  {
    id: 97,
    name: 'Plankebordene',
    slug: 'plankebordene',
    description: 'Web application for ordering custom made wooden tables.',
    url: 'http://www.plankebordene.dk',
    createdAt: new Date,
    image: 'plankebordene.webp',
    roles: ['Product owner', 'Team lead', 'Frontend'],
    technologies: ['React', 'TypeScript', 'NodeJs' ,'MongoDb', 'Docker', 'Git', 'Figma']
  },
  {
    id: 98,
    name: 'AXM Electric',
    slug: 'axm',
    description: 'Website created for same customer as QLR. It is static website focused on SEO and presentation of products.',
    url: 'https://mayki0909.github.io/AXM/',
    createdAt: new Date('2021-11-17'),
    image: 'axm_electric.webp',
    roles: ['Frontend'],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'SEO']
  },
  {
    id: 99,
    name: 'QLR',
    slug: 'qlr',
    description: 'First website created for customer. It is static website for presetation of electric motocycle. It was used to create brand awarness and raise money for prodcution of it.',
    url: 'https://mayki0909.github.io/QLR/',
    createdAt: new Date('2019-12-15'),
    image: 'qlr.webp',
    roles: ['Frontend'],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap']
  },
  {
    id: 100,
    name: 'Endless Runner',
    slug: 'endless-runner',
    description: 'Project created as graduation project in high school.',
    url: 'https://github.com/mayki0909/Endless-Runner',
    createdAt: new Date('2019-04-10'),
    image: 'endless_runner.webp',
    roles: ['Full-stack'],
    technologies: ['C#', 'Unity', 'Andorid']
  }
]