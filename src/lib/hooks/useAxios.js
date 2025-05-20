import axios from "axios";
import { useUserStore } from "../store/userStore";
import { API_URL } from "../util/constants";

// Custom hook to return axios instance with interceptors
export const useAxios = () => {
  const user = useUserStore((state) => state.user);

  const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Attach token to each request if available
  axiosInstance.interceptors.request.use(
    (config) => {
      if (user?.access) {
        config.headers.Authorization = `Bearer ${user.access}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Handle unauthorized errors
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        console.error("Unauthorized! Logging out...");
        useUserStore.getState().removeUser();
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};
