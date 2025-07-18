// import React from "react";
import { useState, useEffect } from "react";
import FormInput from "./FormInput.jsx";
import { Button } from "semantic-ui-react";
import ErrorMessage from "./ErrorMessage.jsx";
import SuccessMsg from "./SuccessMsg.jsx";
import "../css/Login.css";
import signupService from "../services/signup.js";
import { Link } from "react-router-dom";
function Signup(props) {
  const { setUser } = props;
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
          "Username must not contain spaces and password must be at least 6 characters"
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
    <div className={"login-container"}>
      <div className={"login-header"}>
        <h1>Signup</h1>
      </div>
      <form className={"login-input-block"} onSubmit={handleSignup}>
        {error ? <ErrorMessage error={error} /> : null}
        {successmsg && <SuccessMsg msg={successmsg} />}
        <FormInput
          placeholder={"Enter your name"}
          className={"login-input"}
          value={name}
          handleChange={handleNameChange}
          disabled={loading || disabled}
          label={true}
        />
        <FormInput
          placeholder={"Enter you username"}
          className={"login-input"}
          value={username}
          handleChange={handleUsernameChange}
          disabled={loading || disabled}
          required={true}
          label={true}
        />
        <FormInput
          placeholder={"Enter your password"}
          className={"login-input"}
          value={password}
          type="password"
          handleChange={handlePasswordChange}
          disabled={loading || disabled}
          required={true}
          label={true}
        />
        <div className="submit-container login-btn">
          <button type="submit" className="find-a-ride-submit login-btn-inside">
            Sign up
          </button>
        </div>
        <Link to="/">Log in?</Link>
      </form>
    </div>
  );
}

export default Signup;
