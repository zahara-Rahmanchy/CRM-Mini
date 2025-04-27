import axiosInstance from './axiosInstance';

export const fetchDashboardStatistics = async () => {
  const res = await axiosInstance.get('/meta-data');
  console.log("res: ",res.data)
  return res.data;
};
