import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "",
  headers: {
    "Content-Type": "application/json",
  },
});

// Success & Error Interceptors
api.interceptors.response.use(
  (response) => {
    const { config, data, status } = response;

    // Show success toast only for POST/PUT/DELETE requests
    const successMethods = ["post", "put", "delete"];
    if (successMethods.includes(config.method)) {
      // Check if API sent a message, or fallback to default
      const successMessage = data?.message || "Action completed successfully!";
      toast.success(successMessage);
    }

    return response;
  },
  (error) => {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong!";
    toast.error(message);
    return Promise.reject(error);
  }
);

export default api;
