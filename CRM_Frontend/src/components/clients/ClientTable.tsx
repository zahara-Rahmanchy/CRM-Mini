import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteClients, fetchClients } from '../../api/clientApi';
import { PencilIcon, TrashIcon } from '@heroicons/react/16/solid';
import { IClient } from '../../Interfaces/ClientInterface';
import UpdateClientModal from './UpdateClientModal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Thead = [
  "Name",
  "Email",
  "Phone",
  "Company",
  "Notes",
  "Add New Project",
  "Actions"
];

const ClientTable = () => {
    const queryClient = useQueryClient();
    const [selectedClient, setSelectedClient] = useState<IClient | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate=useNavigate();

    const handleAddProject = (email:string)=>{
      navigate("/add-project", { state: { email } });
    }
    const { 
        data: clients, 
        isLoading: clientsLoading, 
        error: clientError 
    } = useQuery({
        queryKey: ['clientsData'], 
        queryFn: fetchClients,
    });

    const deleteMutation = useMutation({
        mutationFn: deleteClients, // Mutation function
        onSuccess: () => {
        //invalidate queries to refresh data after deletion
        queryClient.invalidateQueries({queryKey:['clientsData']});
        alert('Client deleted successfully!');
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
        alert(error?.response?.data?.message || 'Failed to delete client');
        },
    });
    const handleUpdate = (client: IClient) => {
      setSelectedClient(client);
      setIsModalOpen(true); // Open the modal
    };
  const handleDelete = (clientId: string) => {
    
    const isConfirmed = window.confirm('Are you sure you want to delete this client?');
    if (isConfirmed) {
      deleteMutation.mutate(clientId); // Trigger mutation if confirmed
    }
  };
  if (clientsLoading) {
    return (
      <div className="flex justify-center items-center">
        <div className="w-9 h-9 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-ping"></div>
      </div>
    );
  }

 

  return (
    <>
    {(clientError) && <div className="text-center text-red-500">Error: {clientError.message}</div>}
   
    <div className="overflow-hidden">
      {/* Table for larger screens */}
      <div className="hidden md:block">
        <table className="min-w-full table-auto divide-y divide-teal-800 bg-[#ecf3fe] rounded-lg shadow">
          <thead className="bg-teal-800 dark:bg-gray-800 rounded-2xl">
            <tr>
              {Thead.map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider whitespace-nowrap"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-blue-200 border rounded-2xl">
            {clients.data.map((client:IClient, index:number) => (
              <tr
                key={client.client_id}
                className={index % 2 === 0 ? "bg-white  dark:bg-gray-700" : "bg-[#e5effe] dark:bg-gray-500 hover:bg-blue-50 transition-colors"}
              >
                <td className="px-2 text-sm py-4 text-teal-800 dark:text-gray-100">{client.name}</td>
                <td className="px-3 text-sm py-4 text-teal-800 dark:text-gray-100 ">{client.email}</td>
                <td className="px-2 text-sm py-4 text-teal-800 dark:text-gray-100 ">{client.phone}</td>
                <td className="px-2 text-sm py-4 text-teal-800 dark:text-gray-100 ">{client.company || "-"}</td>
                <td className="px-2 text-sm py-4 text-teal-800 dark:text-gray-100">{client.notes || "-"}</td>
                <td className="px-2 text-sm py-4 text-teal-800 dark:text-gray-100 text-center">
                <button
                  onClick={()=>handleAddProject(client.email)}
                  className='cursor-pointer border hover:bg-teal-700 hover:text-white bg-border-200 dark:bg-gray-700 rounded-lg p-2 text-xs text-center mx-auto' 
                >
                Add New Project
              </button>
                </td>
                <td className="px-2 text-sm py-4 text-teal-800 dark:text-gray-100 text-center md:flex gap-2 justify-center items-center">
                    <button className='cursor-pointer bg-gray-100 dark:bg-gray-700 rounded-lg p-1' type='button' onClick={() => handleUpdate(client)}><PencilIcon className="h-6 w-6 text-teal-500" /></button>
                    <button className='cursor-pointer bg-gray-100 dark:bg-gray-700  rounded-lg p-1' type='button' onClick={()=>handleDelete(client.client_id)}> <TrashIcon className="h-6 w-6 text-red-500" /></button>
                </td>
              
              </tr>
            ))}
             {(!clients?.data || clients.data.length === 0)&& 
             <td className="px-2 text-sm py-4 text-teal-800 dark:text-gray-100 text-center">No clients found.</td>}
          </tbody>
        </table>
      </div>

      {/* Card-like Format for Smaller Screens */}
      <div className="md:hidden">
        {clients.data.map((client:IClient) => (
          <div
            key={client.client_id}
            className="bg-white dark:bg-gray-800  p-4 mb-4 rounded-lg shadow-md hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors"
          >
            <div className="font-bold text-teal-800 dark:text-gray-100 py-1">Name: <span className="font-normal">{client.name}</span></div>
            <div className="font-bold text-teal-800 dark:text-gray-100 py-1">Email: <span className="font-normal">{client.email}</span></div>
            <div className="font-bold text-teal-800 dark:text-gray-100 py-1">Phone: <span className="font-normal">{client.phone}</span></div>
            <div className="font-bold text-teal-800 dark:text-gray-100 py-1">Company: <span className="font-normal">{client.company || '-'}</span></div>
            <div className="font-bold text-teal-800 dark:text-gray-100 py-1">Notes: <span className="font-normal">{client.notes || '-'}</span></div>
            <div className="px-2 text-sm py-4 text-teal-800 flex md:flex gap-2 justify-between">
                    <button className='cursor-pointer bg-gray-100 rounded-lg p-1' type='button' onClick={() => handleUpdate(client)}><PencilIcon className="h-6 w-6 text-teal-500" /></button>
                    <button className='cursor-pointer bg-gray-100 rounded-lg p-1' type='button' onClick={()=>handleDelete(client.client_id)}> <TrashIcon className="h-6 w-6 text-red-500" /></button>
                </div>
          </div>
        ))}
      </div>
      <UpdateClientModal
        client={selectedClient as IClient}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
    </>
  );
};

export default ClientTable;
