// import React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import FormInput from "./FormInput.jsx";
import { Button, Label } from "semantic-ui-react";
import ErrorMessage from "./ErrorMessage.jsx";
import "../css/Login.css";
import loginService from "../services/login.js";
import { Link, Navigate } from "react-router-dom";
function Login(props) {
  const { setUser } = props;
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    setUser(null); // clear token on initial mount (dev only)
    // window.localStorage.removeItem('loggedInUser');
  }, []);
  console.log(username, password);
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
      const credentials = { name, username, password };
      const response = await loginService.login(credentials);
      // console.log(response);
      if (response.token) {
        loginService.setToken(response.token);
        window.localStorage.setItem("loggedInUser", JSON.stringify(response));
        setError("");
        setUser(response);
        console.log(response.token);
        setName("");
        setUsername("");
        setPassword("");
      } else {
        setUser(null);
        setError("Invalid credentials please signup first");
      }
    } catch (err) {
      if (err.status === 500)
        setError("Server not working~ Not your problem~!");
      else setError("Invalid username or password please signup first");
      console.log(err);
    } finally {
      setLoading(false); // Stop loader no matter what
    }
  };

  return (
    <div className={"login-container"}>
      <div className={"login-header"}>
        <h1>Login</h1>
      </div>
      <form className={"login-input-block"} onSubmit={handleLogin}>
        {error ? <ErrorMessage error={error} /> : null}
        <FormInput
          placeholder={"Enter your name"}
          className={"login-input"}
          value={name}
          handleChange={handleNameChange}
          disabled={loading}
          label={true}
        />
        <FormInput
          placeholder={"Enter you username"}
          className={"login-input"}
          value={username}
          handleChange={handleUsernameChange}
          disabled={loading}
          required={true}
          label={true}
        />
        <FormInput
          placeholder={"Enter your password"}
          className={"login-input"}
          value={password}
          type="password"
          handleChange={handlePasswordChange}
          disabled={loading}
          required={true}
          label={true}
        />
        {/* <Loader size="medium">Loading</Loader> */}
        {/* <div className={"login-submit"}>
          <Button
            loading={loading}
            secondary
            className={"login-submit-button"}
            disabled={loading}
          >
            Login
          </Button>
        </div> */}
        <div className="submit-container login-btn">
          <button
            type="submit"
            className="find-a-ride-submit login-btn-inside"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loader"></span>
              </>
            ) : (
              "Log in"
            )}
          </button>
        </div>
        <Link to="/signup">Sign up?</Link>
        <Link to="/payment-gateway">Link to new payment gateway i built!</Link>
      </form>
    </div>
  );
}
Login.propTypes = {
  setUser: PropTypes.func.isRequired,
};
export default Login;
