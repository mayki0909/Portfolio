import { IProject } from "../interfaces";
import { projects } from "../contants";

// const headers = {
//   'Content-Type': 'application/json',
// }

// const handleResponse = (res: Response) => {
//   if (res.status === 200) {
//     return res.json();
//   }
//   throw Error(`Error ${res.status}`);
// };

// const url = 'http://localhost:3000/api'

export const ProjectService = {
  // getProjects: async (): Promise<IProject[]> => {
  //   return fetch(`${url}/projects`, {
  //     method: 'GET',
  //     headers
  //   }).then(res => handleResponse(res))
  //   .catch(error => {
  //     throw Error(error);
  //   })
  // },
  getProjectsSlugs: async (): Promise<String[]> => {
    return projects.map(project => project.slug)
  },
  getProject: async (slug: string): Promise<IProject> => {
    return projects.find(project => project.slug === slug)
  },
}