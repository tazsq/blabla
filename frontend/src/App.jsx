import { createContext, useEffect, useState } from "react";
import {
  Link,
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";

import CreateaRide from "./components/CreateaRide";
import Details from "./components/Details";
import FindaRide from "./components/FindaRide";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import PaymentGateway from "./components/PaymentGateway";
import RidesList from "./components/RidesList";
import Signup from "./components/Signup";
import UserContext from "./contexts/UserContext";
import loginService from "./services/login";
import Layout from "./components/Layout";
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      console.log(user);
      //verify through backend endpoint if token expired or not

      try {
        const payload = JSON.parse(atob(user.token.split(".")[1]));
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
      setUser(user);
      loginService.setToken(user.token);
    }
  }, []);
  const handleLogout = () => {
    window.localStorage.removeItem("loggedInUser");
    setUser(null);
  };
  return (
    <UserContext.Provider value={{ user, setUser, handleLogout }}>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* <Navbar user={user} handleLogout={handleLogout} /> */}
              {/* 
              {user === null ? (
                <> */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/details" element={<Details />} />
              <Route path="/payment-gateway" element={<PaymentGateway />} />
              {/* </> */}
              {/* ) : ( */}
              {/* <> */}
              <Route path="/find" element={<FindaRide />} />
              <Route path="/create" element={<CreateaRide />} />
              <Route path="/rides" element={<RidesList />} />
              <Route path="/" element={<Navigate to="/find" />} />
              {/* </> */}
              {/* )} */}
            </Route>
          </Routes>
          {/* <RidesList user={user} /> */}
          {/* <Filter /> */}
          {/* <Calendar /> */}
          {/* <Sidebar /> */}
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
