import axios from 'axios';
import { getToken, key } from '../utils/cookieHelper';


const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically attach the token from cookies
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken(key);
    if (token) {
      config.headers['authorization'] = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
