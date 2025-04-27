import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PencilIcon, TrashIcon } from '@heroicons/react/16/solid';
import { fetchProjects, deleteProject } from '../../api/projectApi';
import { IProjectUpdate } from '../../Interfaces/ProjectInterface';

import UpdateProjectModal from './UpdateProjectModal';
import { statuses } from '../../utils/Statuses';

const Thead = [
  "Title",
  "Client",
  "Status",
  "Deadline",
  "Budget",
  "Actions"
];

const ProjectTable = () => {
  const queryClient = useQueryClient();
  const [selectedProject, setSelectedProject] = useState<IProjectUpdate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  // Fetch projects with search and status filters from the backend
  const { 
    data: projects, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['projectsData', { search: searchQuery, status: selectedStatus }] as const,
    queryFn: fetchProjects,
    // Passing the filters to the backend through the query function
    refetchOnWindowFocus: false,  // Optional, to avoid refetching on focus
  });
  
  const deleteMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projectsData'] });
      alert('Project deleted successfully!');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      alert(error?.response?.data?.message || 'Failed to delete project');
    },
  });

  const handleUpdate = (project: IProjectUpdate) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleDelete = (projectId: string) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this project?');
    if (isConfirmed) {
      deleteMutation.mutate(projectId);
    }
  };

  const handleReset = () => {
    setSearchQuery('');
    setSelectedStatus('');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <div className="w-9 h-9 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-ping"></div>
      </div>
    );
  }

  



  return (
    <div className="">
      {/* Filters always visible */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10 min-h-[50px]">
        <input
          type="text"
          placeholder="Search projects..."
          className="border p-2 rounded-lg w-full md:w-1/3"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="border p-2 rounded-lg w-full md:w-1/4 dark:text-gray-100 dark:bg-gray-700 bg-white text-teal-700"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="">All Status</option>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status.replace('_', ' ')}
            </option>
          ))}
        </select>
        <button
          className="bg-teal-500 text-white px-4 py-2 rounded-lg mt-4 md:mt-0"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
       { (error instanceof Error) &&
    <div className="text-center text-red-500">Error: {error.message}</div>}
      {/* Table for larger screens */}
      
      <div className="hidden md:block">
    
        <table className="min-w-full table-auto divide-y divide-teal-800 bg-[#ecf3fe] rounded-lg shadow">
          <thead className="bg-teal-800 dark:bg-gray-800">
            <tr>
              {Thead.map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {projects?.data?.length > 0 ? (
            projects.data.map((project: IProjectUpdate, index: number) => (
              <tr
                key={project.project_id}
                className={index % 2 === 0 ? "bg-white dark:bg-gray-700" : "bg-[#e5effe] dark:bg-gray-500 hover:bg-blue-50 transition-colors"}
              >
                <td className="px-2 py-4 text-teal-800 dark:text-gray-100">{project.title}</td>
                <td className="px-3 py-4 text-teal-800 dark:text-gray-100">{project?.client?.name || '-'}</td>
                <td className="px-3 py-4 text-teal-800 dark:text-gray-100">{project.status.replace('_', ' ')}</td>
                <td className="px-3 py-4 text-teal-800 dark:text-gray-100">{project.deadline || '-'}</td>
                <td className="px-3 py-4 text-teal-800 dark:text-gray-100">${project.budget || '0'}</td>
                <td className="px-2 py-4 flex gap-2 justify-center">
                  <button className="bg-gray-100 rounded-lg p-1" onClick={() => handleUpdate(project)}>
                    <PencilIcon className="h-6 w-6 text-teal-500" />
                  </button>
                  <button className="bg-gray-100 rounded-lg p-1" onClick={() => handleDelete(project.project_id)}>
                    <TrashIcon className="h-6 w-6 text-red-500" />
                  </button>
                </td>
              </tr>
               ))
              ) : (
                <tr>
                  <td
                    colSpan={6} // span across all columns
                    className="text-center py-6 text-gray-500"
                  >
                    No projects found.
                  </td>
                </tr>
              )}
            </tbody>
        
        </table>
      </div>
 
      {/* Card-like for smaller screens */}
      <div className="md:hidden">
  {projects?.data?.length > 0 ? (
    projects.data.map((project: IProjectUpdate) => (
      <div
        key={project.project_id}
        className="bg-white dark:bg-gray-800 p-4 mb-4 rounded-lg shadow-md hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors"
      >
        <div className="font-bold text-teal-800 dark:text-gray-100 py-1">
          Title: <span className="font-normal">{project?.title}</span>
        </div>
        <div className="font-bold text-teal-800 dark:text-gray-100 py-1">
          Client: <span className="font-normal">{project?.client?.name || '-'}</span>
        </div>
        <div className="font-bold text-teal-800 dark:text-gray-100 py-1">
          Status: <span className="font-normal">{project?.status.replace('_', ' ')}</span>
        </div>
        <div className="font-bold text-teal-800 dark:text-gray-100 py-1">
          Deadline: <span className="font-normal">{project?.deadline || '-'}</span>
        </div>
        <div className="font-bold text-teal-800 dark:text-gray-100 py-1">
          Budget: <span className="font-normal">${project.budget || '0'}</span>
        </div>
        <div className="px-2 py-4 flex gap-2 justify-between">
          <button className="bg-gray-100 rounded-lg p-1" onClick={() => handleUpdate(project)}>
            <PencilIcon className="h-6 w-6 text-teal-500" />
          </button>
          <button className="bg-gray-100 rounded-lg p-1" onClick={() => handleDelete(project.project_id)}>
            <TrashIcon className="h-6 w-6 text-red-500" />
          </button>
        </div>
      </div>
    ))
  ) : (
    <div className="bg-white dark:bg-gray-800 p-6 mb-4 rounded-lg shadow-md text-center text-gray-500 dark:text-gray-300">
      No projects found.
    </div>
  )}
</div>


      <UpdateProjectModal
        project={selectedProject as IProjectUpdate}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ProjectTable;
