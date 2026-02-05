import { createContext, useEffect, useState } from "react";
import axiosInstance from "../services/api";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(window.localStorage.getItem("loggedInUser")),
  );
  useEffect(() => {
    console.log(user);
  }, []);
  const handleLogout = () => {
    window.localStorage.removeItem("loggedInUser");
    axiosInstance
      .post("/api/auth/logout", {})
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, setUser, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
