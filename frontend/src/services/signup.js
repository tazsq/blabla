import axios from "axios";
import axiosInstance from "./api";
const baseUrl = "/api/users";

const signup = async (credentials) => {
  const response = await axiosInstance.post(baseUrl, credentials);
  return response.data;
};

export default { signup };
