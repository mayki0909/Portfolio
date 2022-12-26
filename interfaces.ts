export interface IProject {
  id: number;
  name: string;
  slug: string;
  description: string;
  createdAt: Date;
  url: string;
  image: string;
  roles: string[];
  technologies: string[];
}