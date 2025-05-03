import React from "react";
import "../css/Sidebar.css";

const Sidebar = ({ isOpen }) => {
  return (
    <div className={`sidebar-container ${isOpen ? "open" : ""}`}>
      <div className="sidebar-list-container">
        <ul className="sidebar-list">
          <li>
            <a href="/home">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/login">Login</a>
          </li>
          <li>
            <a href="/signup">Sign up</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
