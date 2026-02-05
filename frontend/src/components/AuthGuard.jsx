import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AuthContext } from "../contexts/AuthContext";
import Loading from "../pages/Loading";
import axiosInstance from "../services/api";
import login from "../services/login";

function AuthGuard({ children }) {
  const [mounted, setMounted] = useState(false);
  const { user, setUser, handleLogout } = useContext(AuthContext);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    console.log(user);
    //verify through backend endpoint if token expired or not

    axiosInstance
      .post("/api/auth/verify", {})
      .then((res) => {
        console.log(res, "from authguard reload");
      })
      .catch(() => handleLogout());
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
