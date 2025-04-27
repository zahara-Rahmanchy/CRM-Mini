import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectAddFormData, projectSchema } from "../../utils/SchemaValidation/ProjectSchema";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { createProject } from "../../api/projectApi";
import { useLocation } from "react-router-dom";

import { IAddProject } from "../../Interfaces/ProjectInterface";

const statuses = [
    "DRAFT",
    "PROPOSAL_SENT",
    "NEGOTIATION",
    "IN_PROGRESS",
    "WAITING_ON_CLIENT",
    "ON_HOLD",
    "COMPLETED",
    "CANCELLED",
  ];
const AddProject = () => {
    const location = useLocation();
    // const navigate=useNavigate()
    const { email } = location.state || {};
    const { register, handleSubmit, formState: { errors }, reset } = useForm< ProjectAddFormData>({
        resolver: zodResolver(projectSchema),
      });
    
      const mutation = useMutation({
        mutationFn: createProject,
        onSuccess: () => {
          alert("Project created successfully!");
          reset();
        //   navigate("/projects")
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error:any) => {
          alert(`Failed to create project: ${error?.response?.data?.message || "Unknown error"}`);
        },
      });
    
      const onSubmit = (data: ProjectAddFormData) => {
        const {title,budget,deadline,status}=data
        const sendData = {
            title,
            budget,
            deadline:new Date(deadline),
            status,
            clientEmail:email
        }
        mutation.mutate(sendData as unknown as IAddProject); // Call API to create the project
      };
    
      return (
        <div className="p-8 rounded-lg  max-w-lg mx-auto bg-white dark:bg-gray-800">
          <h2 className="text-lg font-bold text-teal-700 dark:text-gray-200 mb-4">Add New Project</h2>
    
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Title */}
            <div className="relative">
              <input
                {...register("title")}
                id="title"
                type="text"
                className="peer border border-gray-300 dark:border-gray-700 rounded-lg w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                placeholder=" Project Title "
              />
              
              {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
            </div>
    
            {/* Budget */}
            <div className="relative">
              <input
                {...register("budget", { valueAsNumber: true })}
                id="budget"
                type="number"
                className="peer border border-gray-300 dark:border-gray-700 rounded-lg w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                placeholder="Budget"
              />
              {/* <label htmlFor="budget" className="absolute left-4 -top-3 text-sm text-gray-700 dark:text-white peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:text-teal-500 peer-focus:text-xs">
                Budget
              </label> */}
              {errors.budget && <span className="text-red-500 text-sm">{errors.budget.message}</span>}
            </div>
    
            {/* Deadline */}
            <div className="relative">
              <input
                {...register("deadline")}
                id="deadline"
                type="date"
                className="peer border border-gray-300 dark:border-gray-700 rounded-lg w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                placeholder="Deadline "
              />
              {/* <label htmlFor="deadline" className="absolute left-4 -top-3 text-sm text-gray-700 dark:text-white peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:text-teal-500 peer-focus:text-xs">
                Deadline
              </label> */}
              {errors.deadline && <span className="text-red-500 text-sm">{errors.deadline.message}</span>}
            </div>
    
            {/* Status */}
            <div className="relative">
              <select
                
                {...register("status")}
                id="status"
                className="peer text-sm placeholder:me-3 text-teal-700 dark:text-gray-200 bg-gray-700 border border-gray-300 dark:border-gray-700 rounded-lg w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
              >
                <option disabled value={"Status"}>
                    
                  </option>
                {statuses.map((status) => (
                  <option className="text-md " key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              {/* <label htmlFor="status" className="absolute left-4 -top-3 text-sm text-gray-700 dark:text-white peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:text-teal-500 peer-focus:text-xs">
                Status
              </label> */}
              {errors.status && <span className="text-red-500 text-sm">{errors.status.message}</span>}
            </div>
    
            {/* Submit Button */}
            <div className="flex justify-between mt-4">
             
              <button
                type="submit"
                className="cursor-pointer bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded-lg"
              >
                Save Project
              </button>
            </div>
          </form>
        </div>
)}

export default AddProject