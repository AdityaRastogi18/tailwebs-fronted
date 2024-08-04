import axios from "axios";

const Api = {
  login: async (data) => {
    const url = "http://localhost:3002/login";
    try {
      const response = await axios.post(url, data);
      return response.data;
    } catch (error) {
      console.error("Error logging in:", error.message);
      //   throw error;
    }
  },
};

export default Api;
