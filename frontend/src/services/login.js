import axios from "axios";
import axiosInstance from "./api";
const baseUrl = "/api/auth/login";
let token = null;
const login = async (credentials) => {
  const response = await axiosInstance.post(baseUrl, credentials);
  console.log(response);
  return response.data;
};

export default { login };
