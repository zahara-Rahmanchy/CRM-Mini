import { zodResolver } from "@hookform/resolvers/zod";
// import { ProjectFormData, projectUpdateSchema } from "../utils/SchemaValidation/ProjectValidation";
import { useForm } from "react-hook-form";
import {IProjectUpdate } from "../../Interfaces/ProjectInterface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "../../api/projectApi";
import { useEffect, useState } from "react";
import { ProjectFormData, projectUpdateSchema } from "../../utils/SchemaValidation/ProjectSchema";
import { statuses } from "../../utils/Statuses";
// import { statuses } from "../../utils/Statuses";

interface UpdateProjectModalProps {
  project: IProjectUpdate;
  isOpen: boolean;
  onClose: () => void;
}

const UpdateProjectModal = ({ project, isOpen, onClose }: UpdateProjectModalProps) => {
  const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm<ProjectFormData>({
    resolver: zodResolver(projectUpdateSchema),
  });

  const queryClient = useQueryClient();
  const [selectedStatus, setSelectedStatus] = useState('');
  

  useEffect(() => {
    if (project) {
      setValue("title", project.title);
    //   setValue("description", project.description || '');
      setValue("status", project.status || "DRAFT");
      setValue("budget", project.budget);
      setValue("deadline", project.deadline || '');
    }
  }, [project, setValue]);

  const mutation = useMutation({
    mutationFn: updateProject,
    onSuccess: () => {
      alert('Project updated successfully!');
      onClose();
      queryClient.invalidateQueries({ queryKey: ['projectsData'] });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      alert(error?.response?.data?.message || 'Failed to update project');
    },
  });

  const onSubmit = () => {
    const formData = getValues();
    const updatedData: Partial<IProjectUpdate> = {};

    if (formData.title !== project.title) updatedData.title = formData.title;
   
    if (formData.status !== project.status) updatedData.status = formData.status;
    if (formData.budget !== project.budget) updatedData.budget = formData.budget;
    if (formData.deadline !== project.deadline) updatedData.deadline = formData.deadline;

    const isConfirmed = window.confirm('Are you sure you want to update this project?');
    if (isConfirmed) {
      if (Object.keys(updatedData).length > 0) {
        mutation.mutate({ project_id: project.project_id, data: updatedData });
      }
    }
  };

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center backdrop-blur-md dark:bg-gray-900 bg-opacity-90">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4 text-teal-500">Update Project</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
            type="text"
            {...register('title')}
            placeholder="Project Title"
          />
          {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}


           <select
           {...register('status')}
              className="border text-md border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    <option value="" className="text-sm">{project.status}</option>
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status.replace('_', ' ')}
                      </option>
                    ))}
                  </select>
          {errors.status && <span className="text-red-500 text-sm">{errors.status.message}</span>}

          <input
            type="date"
            {...register('deadline')}
            className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          {errors.deadline && <span className="text-red-500 text-sm">{errors.deadline.message}</span>}

          <input
            type="number"
            {...register('budget')}
            className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          {errors.budget && <span className="text-red-500 text-sm">{errors.budget.message}</span>}

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white font-semibold py-2 px-3 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="cursor-pointer bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-3 rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProjectModal;
