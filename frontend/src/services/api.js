import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (request) => {
    const user = localStorage.getItem("loggedInUser");
    console.log(user);
    let accessToken = null;
    if (user) {
      accessToken = JSON.parse(user)?.accessToken;
    }
    request.headers["Authorization"] = `Bearer ${accessToken}`;
    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("hello");
    console.log(response);
    return response;
  }, // Directly return successful responses.
  async (error) => {
    console.log(error);
    const originalRequest = error.config;
    console.log(originalRequest, "in error code of interceptor");
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
      try {
        console.log("made a new refresh token request");
        // Make a request to your auth server to refresh the token.
        const response = await axios.post("/api/auth/refresh");
        console.log(response, "------------------------------");
        const { accessToken } = response.data;
        console.log(accessToken, "new accesstoken recvd");
        // Store the new access and refresh tokens.
        const user = { accessToken };
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        console.log("set new access token in localstorage", user);
        // Update the authorization header with the new access token.
        axiosInstance.defaults.headers.common["Authorization"] =
          `Bearer ${accessToken}`;
        return axiosInstance(originalRequest); // Retry the original request with the new access token.
      } catch (refreshError) {
        console.log(refreshError);
        // Handle refresh token errors by clearing stored tokens and redirecting to the login page.
        console.error("Token refresh failed:", refreshError);
        localStorage.removeItem("loggedInUser");
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error); // For all other errors, return the error as is.
  },
);
export default axiosInstance;
