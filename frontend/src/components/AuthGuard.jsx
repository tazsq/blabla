import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import login from "../services/login";
import Loading from "../pages/Loading";
import { toast } from "sonner";

function AuthGuard({ children }) {
  const [mounted, setMounted] = useState(false);
  const { user, setUser, handleLogout } = useContext(AuthContext);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (user) {
      console.log(user);
      //verify through backend endpoint if token expired or not

      try {
        const payload = JSON.parse(atob(user.accessToken.split(".")[1]));
        console.log(payload, "-----payload");
        const now = Date.now();
        console.log(payload.exp, "---------payload.exp");
        if (payload.exp * 1000 < now) {
          // Token expired
          handleLogout(); // Clear localStorage and redirect
        } else {
          // Token valid → maybe setUser(), etc.
          console.log("Token still valid");
        }
      } catch (err) {
        console.log(err);
        handleLogout(); // Malformed token
      }
      login.setToken(user.accessToken);
    }
  }, []);
  const navigate = useNavigate();
  if (!mounted) return <Loading />;
  if (
    (location.pathname === "/login" || location.pathname === "/signup") &&
    user
  ) {
    console.log(location.pathname);
    navigate("/", { replace: true });
    toast.error("Already logged in!");
    return;
  }
  if (
    (location.pathname === "/login" || location.pathname === "/signup") &&
    !user
  ) {
    console.log(location.pathname);
    return <div>{children}</div>;
  }
  if (!user) {
    navigate("/login", { replace: true });
    return <Loading />;
  }
  return <div>{children}</div>;
}

export default AuthGuard;
