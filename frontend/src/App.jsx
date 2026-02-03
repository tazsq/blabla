import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";

import AuthGuard from "./components/AuthGuard";
import CreateaRide from "./components/CreateaRide";
import Details from "./components/Details";
import FindaRide from "./components/FindaRide";
import Layout from "./components/Layout";
import Login from "./components/Login";
import PaymentGateway from "./components/PaymentGateway";
import RidesList from "./components/RidesList";
import Signup from "./components/Signup";
import Home from "./pages/Home";
function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              path="/login"
              element={
                <AuthGuard>
                  <Login />
                </AuthGuard>
              }
            />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/details"
              element={
                <AuthGuard>
                  <Details />
                </AuthGuard>
              }
            />
            <Route path="/payment-gateway" element={<PaymentGateway />} />
            <Route
              path="/find"
              element={
                <AuthGuard>
                  <FindaRide />
                </AuthGuard>
              }
            />
            <Route
              path="/create"
              element={
                <AuthGuard>
                  <CreateaRide />
                </AuthGuard>
              }
            />
            <Route path="/rides" element={<RidesList />} />
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
