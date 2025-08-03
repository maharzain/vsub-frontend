import axios from 'axios';
import { toast } from 'react-hot-toast'; // Import toast from react-hot-toast

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || "http://203.161.60.135:5000";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = "/login";
    }
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(error.response.data.error);
    } else {
      toast.error("An error occurred. Please try again.");
    }
    return Promise.reject(error);
  }
);

export default axios;