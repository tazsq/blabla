import axios from "axios";
import axiosInstance from "./api";
const routeBaseurl = "/api/routes";

const create = async (newRoute, token) => {
  console.log(token);

  const resp = await axiosInstance.post(routeBaseurl, newRoute);
  return resp.data;
};
const getAllRoutes = async (token) => {
  try {
    const resp = await axiosInstance.get(routeBaseurl);
    return resp;
  } catch (err) {
    console.log(err);
    return err;
  }
};
async function bookRide(token, ride) {
  try {
    const resp = await axiosInstance.post("/api/routes/book", ride);
    // console.log(resp);
    return resp;
  } catch (error) {
    return error;
  }
}
export default { create, getAllRoutes, bookRide };
