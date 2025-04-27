
import { IAddProject, IProject } from '../Interfaces/ProjectInterface';
import axiosInstance from './axiosInstance';

// Create a new project
export const createProject = async (data: IAddProject) => {
  const res = await axiosInstance.post('/project', data);
  return res.data;
};

// Fetch all projects 
// export const fetchProjects = async (params?: { search?: string; status?: string }) => {
//   const res = await axiosInstance.get('/get-projects', { params });
//   return res.data;
// };
// Fetch all projects with params
export const fetchProjects = async ({ queryKey }: { queryKey: [string, { search: string; status: string }] }) => {
  const [, { search, status }] = queryKey;  // Destructure the queryKey tuple
  const res = await axiosInstance.get('/get-projects', { params: { search, status } });
  return res.data;
};


// Update a project
export const updateProject = async ({
  project_id,
  data,
}: {
  project_id: string;
  data: Partial<IProject>;
}) => {
  const res = await axiosInstance.patch(`/update-project/${project_id}`, data);
  return res.data;
};

// Delete a project
export const deleteProject = async (projectId: string) => {
  const res = await axiosInstance.delete(`/delete-project/${projectId}`);
  return res.data;
};
