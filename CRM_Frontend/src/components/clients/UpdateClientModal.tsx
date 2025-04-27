import { zodResolver } from "@hookform/resolvers/zod";
import { ClientFormData, clientUpdateSchema } from "../../utils/SchemaValidation/ClientValidation";
import { useForm } from "react-hook-form";
import { IClient } from "../../Interfaces/ClientInterface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateClients } from "../../api/clientApi";
import { useEffect } from "react";


interface UpdateClientModalProps {
  client: IClient;
  isOpen: boolean;
  onClose: () => void;
}

const UpdateClientModal = ({ client, isOpen, onClose }: UpdateClientModalProps) => {
  const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm<ClientFormData>({
    resolver: zodResolver(clientUpdateSchema),
  });
 
   const queryClient = useQueryClient();
  
  useEffect(() => {
    if (client) {
      setValue("name", client.name);
      setValue("email", client.email);
      setValue("phone", client.phone);
      setValue("company", client.company || '');
      setValue("notes", client.notes || '');
    }
  }, [client, setValue]);

  const mutation = useMutation({
    mutationFn: updateClients,
    onSuccess: () => {
      alert('Client updated successfully!');
      onClose(); // Close the modal on success
      queryClient.invalidateQueries({queryKey:['clientsData']});
     
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      alert(error?.response?.data?.message || 'Failed to update client');
    },
  });

  const onSubmit = () => {
    const formData = getValues();

    // Comparing form data with the original client data and only send changed fields
    const updatedData: Partial<IClient> = {};

    if (formData.name !== client.name) updatedData.name = formData.name;
    if (formData.email !== client.email) updatedData.email = formData.email;
    if (formData.phone !== client.phone) updatedData.phone = formData.phone;
    if (formData.company !== client.company) updatedData.company = formData.company;
    if (formData.notes !== client.notes) updatedData.notes = formData.notes;

    // Send only updated data to the mutation function
    const isConfirmed = window.confirm('Are you sure you want to update this client?');
    if (isConfirmed) {
      if (Object.keys(updatedData).length > 0) {
        mutation.mutate({ client_id: client.client_id, data: updatedData });
       
      }
    }
   
  };

  if (!isOpen || !client) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center backdrop-blur-md dark:bg-gray-900 bg-opacity-90">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4 text-teal-500">Update Client</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
            type="text"
            id="name"
            {...register('name')}
            placeholder="Name"
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}

          <input
            className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
            type="email"
            id="email"
            {...register('email')}
            placeholder="Email address"
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}

          <input
            className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
            type="text"
            id="phone"
            {...register('phone')}
            placeholder="Phone"
          />
          {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}

          <input
            className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
            type="text"
            id="company"
            {...register('company')}
            placeholder="Company (optional)"
          />

          <textarea
            id="notes"
            {...register('notes')}
            placeholder="Notes (optional)"
            className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
          />

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

export default UpdateClientModal;
