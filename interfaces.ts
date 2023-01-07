export interface IProject {
  id: number;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  aboutProject: string;
  createdAt: string;
  url: string;
  image: string;
  creativeImage: string;
  roles: string[];
  technologies: string[];
}