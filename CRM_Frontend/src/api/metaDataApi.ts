import axiosInstance from './axiosInstance';

export const fetchDashboardStatistics = async () => {
  const res = await axiosInstance.get('/meta-data');
  return res.data;
};
