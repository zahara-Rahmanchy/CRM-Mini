import { IClient } from '../Interfaces/ClientInterface';
import axiosInstance from './axiosInstance';

export const createClient = async (data: Partial<IClient>) => {
    const res = await axiosInstance.post('/client', data);
    return res.data;
  };
export const fetchClients = async () => {
  const res = await axiosInstance.get('/get-clients');
  return res.data;
};

export const updateClients = async ({ client_id, data }: { client_id: string; data: Partial<IClient> }) => {
    const res = await axiosInstance.patch(`/update-client/${client_id}`,data);
    return res.data;
  };

export const deleteClients = async (clientId:string) => {
    const res = await axiosInstance.delete(`/delete-client/${clientId}`);
    return res.data;
  };
  