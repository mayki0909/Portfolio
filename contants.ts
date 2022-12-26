import { IProject } from './interfaces';
export const projects: IProject[] = [
  {
    id: 1,
    name: 'Plankebordene',
    slug: 'plankebordene',
    description: 'The company is developing management programs for logistical companies. In my time with them, my programming and general computer skills have greatly improved. The company is developing management programs for logistical companies. In my time with them, my programming and general computer skills have greatly improved. The company is developing management programs for logistical companies. In my time with  The company is developing management programs for logistical companies. In my time with The company is developing management programs for logistical companies. In my time with The company is developing management programs for logistical companies. In my time with The company is developing management programs for logistical companies. In my time with The company is developing management programs for logistical companies. In my time with ',
    url: 'http://www.plankebordene.dk',
    createdAt: new Date,
    image: 'plankebordene.png',
    roles: ['Product owner', 'Team lead', 'Frontend'],
    technologies: ['React', 'TypeScript', 'NodeJs' ,'MongoDb', 'Docker', 'Git', 'Figma']
  },
  {
    id: 2,
    name: 'AXM',
    slug: 'axm',
    description: 'The company is developing management programs for logistical companies. In my time with them, my programming and general computer skills have greatly improved. The company is developing management programs for logistical companies. In my time with them, my programming and general computer skills have greatly improved.',
    url: 'https://www.axmelectric.com/',
    createdAt: new Date,
    image: 'axm_electric.png',
    roles: ['Frontend'],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap']
  }
]