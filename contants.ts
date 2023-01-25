import { IProject } from './interfaces';

export const metadata = {
  url: 'https://miha-znidar.vercel.app/',
  title: 'Miha Žnidar - Full-Stack Web Developer',
  description: 'I am Miha Žnidar full-stack web developer from Slovenia. Interested in blockchain, web development and AR/VR technologies. Looking forward to new projects.',
  image: '/assets/header.jpg'
}

export const projects: IProject[] = [
  {
    id: 96,
    name: 'Clout.art',
    slug: 'clout.art',
    shortDescription: 'NFT Minting Platform',
    description: 'Web application for minting NFTs from Instagram posts and files. Helping independet small creators to learn and create their first NFTs.',
    aboutProject: 'Web application is written in Next.js and using NodeJs and MongoDb as backend. In application is integrated smart contract for Hedera Hashgraph network (first was implemented Matic, but we changed to Hedera). I have been working on this project from the start when we were building MVP app. After getting investment we started building bigger platform for helping indepedent creators. I have been working on all parts of application (frontend, backend, devOps, integrating smart contract ...)',
    url: 'http://www.clout.art',
    createdAt: new Date(2022,12,1).toDateString(),
    image: 'cloutart-shadow.jpg',
    creativeImage: '',
    roles: ['Frontend', 'Backend'],
    technologies: ['Solidity', 'React', 'Next.js', 'TypeScript', 'Node.js', 'MongoDB', 'Git', 'Figma'],
  },
  {
    id: 97,
    name: 'Plankebordene',
    slug: 'plankebordene',
    shortDescription: 'Web application for ordering custom made wooden tables.',
    description: 'Configurator and online shop. Its special feature is a configurator that guides you through the creation and ordering of a custom table in less than 5 minutes.',
    aboutProject: 'The web application is written in React.js, optimised for computer and mobile screens. I worked on the project as project manager and front-end developer and was involved in the whole development process. I started with requirements analysis and document preparation. With the successful completion of the project, I proved to myself that I have learned a lot in 3 years of programming. I also gained many other skills from the IT world (communicating with clients, preparing documentation, managing and coordinating a small team).',
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
    description: 'Website created for same customer as QLR focused on SEO optimization.',
    aboutProject: 'It is static website focused on SEO and presentation of 4 electric motors. The website was crafted with precision, using HTML5, CSS3, JavaScript and Bootstrap to provide a visually striking, user-friendly and resposive design.',
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
    description: 'Website created based on customers wishes.',
    aboutProject: 'Primary goals of website were to present an electric motocycle, create brand awareness and raise funds for the production of the motocycle. Website was created by using HTML5, CSS3, Javascript and Bootstrap to provide resposive design.',
    url: 'https://mayki0909.github.io/QLR/',
    createdAt: new Date(2019,12,15).toDateString(),
    image: 'qlr.webp',
    creativeImage: '',
    roles: ['Frontend'],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap']
  },
  // {
  //   id: 100,
  //   name: 'Endless Runner',
  //   slug: 'endless-runner',
  //   shortDescription: 'Mobile game for android',
  //   description: "For graduation project in high school I created android mobile game  using Unity Game Engine using C# programming language.",
  //   aboutProject: "It is endless runner type of game. Where the player controls the characters's jumping by clicking on the screen, and holding the press longer lead to a higher jump. The objective of the game is to collect coins while avoiding obstacles. As the game progresses, the platforms move faster, increasing the difficulty level and challenging the player.",
  //   url: 'https://github.com/mayki0909/Endless-Runner',
  //   createdAt: new Date(2019,4,10,).toDateString(),
  //   image: 'endless_runner.webp',
  //   creativeImage: '',
  //   roles: ['Full-stack'],
  //   technologies: ['C#', 'Unity', 'Andorid']
  // }
]