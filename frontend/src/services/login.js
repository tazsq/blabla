import axios from "axios";
const baseUrl = "/api/login";
const createRoutes = "/api/routes";
let token = null;
const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};
const create = async (newRoute) => {
  console.log(token);
  const config = {
    headers: { Authorization: token },
  };
  const resp = await axios.post(createRoutes, newRoute, config);
  return resp.data;
};
export default { login, setToken, create };
