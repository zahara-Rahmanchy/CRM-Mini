
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ClientFormData, clientUpdateSchema } from "../../utils/SchemaValidation/ClientValidation";
import { createClient } from "../../api/clientApi";

// Receiving setIsOpen prop to close form after submit
const AddClient = ({ setIsOpen }: { setIsOpen: (open: boolean) => void }) => {
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ClientFormData>({
    resolver: zodResolver(clientUpdateSchema),
  });

  const mutation = useMutation({
    mutationFn: createClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clientsData'] });
      alert('Client created successfully!');
      reset(); // Clear the form
      setIsOpen(false); // Close the form after submit
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      alert(error?.response?.data?.message || 'Failed to create client');
    },
  });

  const onSubmit = (data: ClientFormData) => {
    mutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
    >
      {/* First Row - Name, Email, Phone */}
      <div className="flex flex-col lg:flex-row gap-4">
        <input
          {...register("name")}
          type="text"
          placeholder="Name"
          className="flex-1 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="flex-1 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
        <input
          {...register("phone")}
          type="text"
          placeholder="Phone"
          className="flex-1 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
      </div>

      {/* Error Row */}
      <div className="flex flex-col lg:flex-row gap-4">
        <span className="text-red-500 text-sm">{errors.name?.message}</span>
        <span className="text-red-500 text-sm">{errors.email?.message}</span>
        <span className="text-red-500 text-sm">{errors.phone?.message}</span>
      </div>

      {/* Second Row - Company, Notes, Submit */}
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        <input
          {...register("company")}
          type="text"
          placeholder="Company (optional)"
          className="flex-1 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
        <input
          {...register("notes")}
          type="text"
          placeholder="Notes (optional)"
          className="flex-1 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
        <button
          type="submit"
          className="bg-teal-600 cursor-pointer hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default AddClient;

