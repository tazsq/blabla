import axios from "axios";
const baseUrl = "/api/auth/login";
let token = null;
const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  console.log(response);
  return response.data;
};
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};
export default { login, setToken };
