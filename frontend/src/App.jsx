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
import FindaRide from "./components/FindaRide";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import PaymentGateway from "./components/PaymentGateway";
import RidesList from "./components/RidesList";
import Signup from "./components/Signup";
import loginService from "./services/login";
import Details from "./components/Details";
function App() {
  const [user, setUser] = useState(null);
  const UserContext = createContext();

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
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <div className="app">
          <Navbar user={user} handleLogout={handleLogout} />
          <Routes>
            {user === null ? (
              <>
                <Route path="/details" element={<Details />} />
                <Route path="/payment-gateway" element={<PaymentGateway />} />
                <Route path="/" element={<Login setUser={setUser} />} />
                <Route path="/signup" element={<Signup setUser={setUser} />} />
                <Route path="*" element={<Login setUser={setUser} />} />
              </>
            ) : (
              <>
                <Route path="/find" element={<FindaRide user={user} />} />
                <Route path="/create" element={<CreateaRide user={user} />} />
                <Route path="/rides" element={<RidesList user={user} />} />
                <Route path="/" element={<Navigate to="/find" />} />
              </>
            )}
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
