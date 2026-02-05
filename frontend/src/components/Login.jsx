// import React from "react";
import { Spinner } from "@/components/ui/spinner";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import "../css/Login.css";
import loginService from "../services/login.js";
import ErrorMessage from "./ErrorMessage.jsx";
import FormInput from "./FormInput.jsx";
import { toast } from "sonner";
function Login() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user, setUser, handleLogout } = useContext(AuthContext);
  const handleNameChange = (e) => {
    if (error) setError("");
    setName(e.target.value);
  };
  const handleUsernameChange = (e) => {
    if (error) setError("");
    const value = e.target.value.replace(/\s/g, "");

    setUsername(value);
  };
  const handlePasswordChange = (e) => {
    if (error) setError("");
    const value = e.target.value.replace(/\s/g, "");

    setPassword(value);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true); // Start loading immediately

    try {
      const credentials = {
        name: name.trim(),
        username: username.trim().toLowerCase(),
        password,
      };
      console.log(credentials, "credentials");
      const response = await loginService.login(credentials);
      console.log(response, "response");
      if (response.accessToken) {
        window.localStorage.setItem("loggedInUser", JSON.stringify(response));
        setUser(response);
        navigate("/find", { replace: true });
        console.log(response.accessToken);
        setName("");
        setUsername("");
        setPassword("");
      } else {
        setUser(null);
        toast.error("Invalid credentials please signup first");
      }
    } catch (err) {
      if (err.status === 500)
        toast.error("Server not working~ Not your problem~!");
      else toast.error("Invalid username or password please signup first");
      console.log(err);
    } finally {
      setLoading(false); // Stop loader no matter what
    }
  };

  return (
    <div className="flex justify-center items-center my-8 ">
      <div className="flex  flex-col items-center justify-center min-h-[75vh] min-w-[60vw] max-w-80 gap-8 p-8 bg-white shadow-xl backdrop-blur-md rounded-3xl">
        {/* Header */}
        <div className="flex items-center justify-center">
          <h1 className="text-[32px] font-bold text-gray-800">Login</h1>
        </div>

        {/* Form */}
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center  gap-4 w-full max-w-80"
        >
          {error && <ErrorMessage error={error} />}

          <FormInput
            placeholder="Enter your name"
            value={name}
            handleChange={handleNameChange}
            disabled={loading}
            label
            className="bg-gray-100 rounded-2xl focus-within:border-[3px] focus-within:border-cyan-400"
          />

          <FormInput
            placeholder="Enter your username"
            value={username}
            handleChange={handleUsernameChange}
            disabled={loading}
            required
            label
            className="bg-gray-100 rounded-2xl focus-within:border-[3px] focus-within:border-cyan-400"
          />

          <FormInput
            placeholder="Enter your password"
            type="password"
            value={password}
            handleChange={handlePasswordChange}
            disabled={loading}
            required
            label
            className="bg-gray-100 rounded-2xl focus-within:border-[3px] focus-within:border-cyan-400"
          />

          {/* Submit */}
          <div className="mt-4 flex items-center justify-center w-[93px] h-[48px] rounded-2xl">
            <button
              type="submit"
              disabled={loading}
              className="
              flex items-center justify-center
              w-[93px] h-[48px]
              rounded-2xl
              bg-gradient-to-br from-cyan-400 to-blue-500
              text-white font-semibold
              shadow-md
              transition-all duration-200
              hover:from-blue-500 hover:to-cyan-400
              hover:shadow-lg hover:-translate-y-0.5
              disabled:opacity-70 disabled:cursor-not-allowed
            "
            >
              {loading ? <Spinner className="size-8" /> : "Log in"}
            </button>
          </div>

          {/* Links */}
          <Link to="/signup" className="text-sm text-blue-600 hover:underline">
            Sign up?
          </Link>
          <Link
            to="/payment-gateway"
            className="text-sm text-blue-600 hover:underline"
          >
            Link to new payment gateway i built!
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
