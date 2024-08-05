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
      toast.success("SignUp successful!");
      return response.data;
    } catch (error) {
      console.error("Error logging in:", error.message);
      toast.error(error.response.data.msg);
    }
  },
  getStudents: async (token, page, pageLimit, sortOrder, query) => {
    const url = `http://localhost:3002/student?limit=${pageLimit}&page=${page}&search=${query}&sort=${sortOrder}`;
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // toast.success("Login successful!");
      return response.data;
    } catch (error) {
      console.error("Error logging in:", error.message);
      toast.error(error.response.data.msg);
    }
  },
  editStudentEntry: async (token, id, data) => {
    const url = `http://localhost:3002/student/${id}`;
    try {
      const response = await axios.patch(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Entry updated successfully!");
      return response.data;
    } catch (error) {
      console.error("Error logging in:", error.message);
      toast.error(error.response.data.msg);
    }
  },
  deleteStudentEntry: async (token, id) => {
    const url = `http://localhost:3002/student/${id}`;
    try {
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Student deleted successfully!");
      return response.data;
    } catch (error) {
      console.error("Error logging in:", error.message);
      toast.error(error?.response?.data.msg);
    }
  },
  addStudent: async (token, student) => {
    const url = "http://localhost:3002/student";
    try {
      const response = await axios.post(url, student, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Student created successfully!");
      return response.data;
    } catch (error) {
      console.error("Error logging in:", error.message);
      toast.error(error.response.data.msg);
    }
  },
};

export default Api;
