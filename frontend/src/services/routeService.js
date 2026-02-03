import axios from "axios";
const routeBaseurl = "/api/routes";

const create = async (newRoute, token) => {
  console.log(token);
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const resp = await axios.post(routeBaseurl, newRoute, config);
  return resp.data;
};
const getAllRoutes = async (token) => {
  try {
    const resp = await axios.get(routeBaseurl);
    return resp;
  } catch (err) {
    console.log(err);
    return err;
  }
};
async function bookRide(token, ride) {
  try {
    const resp = await axios.post("/api/routes/book", ride, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log(resp);
    return resp;
  } catch (error) {
    return error;
  }
}
export default { create, getAllRoutes, bookRide };
