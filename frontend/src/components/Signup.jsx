// import React from "react";
import { useContext, useEffect, useState } from "react";
import FormInput from "./FormInput.jsx";
// import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.jsx";
import "../css/Login.css";
import signupService from "../services/signup.js";
import ErrorMessage from "./ErrorMessage.jsx";
import SuccessMsg from "./SuccessMsg.jsx";
function Signup() {
  const { setUser } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successmsg, setSuccessmsg] = useState("");
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    setUser(null);
    // window.localStorage.removeItem("loggedInUser");
    setDisabled(false); // clear token on initial mount (dev only)
  }, []);

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
  const handleSignup = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true); // Start loading immediately

    try {
      const credentials = { name, username, password };
      if (username.includes(" ") || password.length < 4) {
        setError(
          "Username must not contain spaces and password must be at least 6 characters",
        );
        setLoading(false);
        return;
      }
      console.log(username);
      const response = await signupService.signup(credentials);
      setError("");
      setSuccessmsg("Voila, now log in");
      setName("");
      setUsername("");
      setPassword("");
      setDisabled(true);
    } catch (err) {
      setDisabled(false);
      setSuccessmsg("");
      if (err.status === 500)
        setError("Server not working~ Not your problem~!");
      else if (err.status === 400) setError("Username already exists");
      else setError("cannot signup right now!");
      console.log(err);
    } finally {
      setLoading(false); // Stop loader no matter what
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] min-w-[60vw] gap-16 p-8">
      {/* Header */}
      <div className="flex items-center justify-center mb-14">
        <h1 className="text-[32px] font-bold text-gray-800">Signup</h1>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSignup}
        className="flex flex-col items-center gap-4 w-full max-w-[320px]"
      >
        {error && <ErrorMessage error={error} />}
        {successmsg && <SuccessMsg msg={successmsg} />}

        <FormInput
          placeholder="Enter your name"
          value={name}
          handleChange={handleNameChange}
          disabled={loading || disabled}
          label
          className="bg-gray-100 rounded-2xl focus-within:border-[3px] focus-within:border-cyan-400"
        />

        <FormInput
          placeholder="Enter your username"
          value={username}
          handleChange={handleUsernameChange}
          disabled={loading || disabled}
          required
          label
          className="bg-gray-100 rounded-2xl focus-within:border-[3px] focus-within:border-cyan-400"
        />

        <FormInput
          placeholder="Enter your password"
          type="password"
          value={password}
          handleChange={handlePasswordChange}
          disabled={loading || disabled}
          required
          label
          className="bg-gray-100 rounded-2xl focus-within:border-[3px] focus-within:border-cyan-400"
        />

        {/* Submit */}
        <div className="mt-4 flex items-center justify-center w-[93px] h-[48px] rounded-2xl">
          <button
            type="submit"
            disabled={loading || disabled}
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
            Sign up
          </button>
        </div>

        {/* Links */}
        <Link to="/login" className="text-sm text-blue-600 hover:underline">
          Log in?
        </Link>
        <Link
          to="/payment-gateway"
          className="text-sm text-blue-600 hover:underline"
        >
          Link to new payment gateway i built!
        </Link>
      </form>
    </div>
  );
}

export default Signup;
