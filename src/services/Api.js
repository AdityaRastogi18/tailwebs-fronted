import axios from "axios";
import { toast } from "react-toastify";

const Api = {
  login: async (data) => {
    const url = "http://localhost:3002/login";
    try {
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      toast.success("Login successful!");
      return response.data;
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  },
  signup: async (data) => {
    const url = "http://localhost:3002/signup";
    try {
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      toast.success("Login successful!");
      return response.data;
    } catch (error) {
      console.error("Error logging in:", error.message);
      toast.error(error.response.data.msg);
    }
  },
};

export default Api;
