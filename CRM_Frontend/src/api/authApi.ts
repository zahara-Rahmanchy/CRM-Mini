import axiosInstance from "./axiosInstance";


export const loginUser = async (data: { email: string; password: string }) => {
  const res = await axiosInstance.post("/login", data);
  return res.data;
};

export const registerUser = async (data: { name: string; email: string; password: string }) => {
  const res = await axiosInstance.post("/register", data);
  return res.data;
};


