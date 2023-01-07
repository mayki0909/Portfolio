import { IProject } from './interfaces';

export const metadata = {
  url: 'https://miha-znidar.vercel.app/',
  title: 'Miha Žnidar - Full-Stack Web Developer',
  description: 'I am Miha Žnidar full-stack web developer from Slovenia. Interested in blockchain, web development and AR/VR technologies. Looking forward to new projects.',
  image: '/assets/header.jpg'
}

export const projects: IProject[] = [
  {
    id: 97,
    name: 'Plankebordene',
    slug: 'plankebordene',
    shortDescription: 'Web application for ordering custom made wooden tables.',
    description: 'Web application for ordering custom made wooden tables.',
    aboutProject: '',
    url: 'http://www.plankebordene.dk',
    createdAt: new Date(2022,5,1).toDateString(),
    image: 'plankebordene.webp',
    creativeImage: '',
    roles: ['Product owner', 'Team lead', 'Frontend'],
    technologies: ['React', 'TypeScript', 'NodeJs' ,'MongoDb', 'Docker', 'Git', 'Figma']
  },
  {
    id: 98,
    name: 'AXM Electric',
    slug: 'axm',
    shortDescription: 'Static website focused on SEO',
    description: 'Website created for same customer as QLR. It is static website focused on SEO and presentation of products.',
    aboutProject: 'Website created for same customer as QLR. It is static website focused on SEO and presentation of products. Website created for same customer as QLR. It is static website focused on SEO and presentation of products. Website created for same customer as QLR. It is static website focused on SEO and presentation of products. Website created for same customer as QLR. It is static website focused on SEO and presentation of products.',
    url: 'https://mayki0909.github.io/AXM/',
    createdAt: new Date(2021,11,17).toDateString(),
    image: 'axm_electric.webp',
    creativeImage: 'projectCreative.png',
    roles: ['Frontend'],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'SEO']
  },
  {
    id: 99,
    name: 'QLR',
    slug: 'qlr',
    shortDescription: 'Static website',
    description: 'First website created for customer. It is static website for presetation of electric motocycle. It was used to create brand awarness and raise money for prodcution of it.',
    aboutProject: '',
    url: 'https://mayki0909.github.io/QLR/',
    createdAt: new Date(2019,12,15).toDateString(),
    image: 'qlr.webp',
    creativeImage: '',
    roles: ['Frontend'],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap']
  },
  {
    id: 100,
    name: 'Endless Runner',
    slug: 'endless-runner',
    shortDescription: 'Mobile game for android',
    description: 'Project created as graduation project in high school.',
    aboutProject: '',
    url: 'https://github.com/mayki0909/Endless-Runner',
    createdAt: new Date(2019,4,10,).toDateString(),
    image: 'endless_runner.webp',
    creativeImage: '',
    roles: ['Full-stack'],
    technologies: ['C#', 'Unity', 'Andorid']
  }
]