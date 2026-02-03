import { createContext, useEffect, useState } from "react";

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
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, setUser, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
