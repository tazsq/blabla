import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Layout() {
  return (
    <div className="min-h-screen w-full relative bg-white">
      <Navbar />
      <div className="mt-16">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
