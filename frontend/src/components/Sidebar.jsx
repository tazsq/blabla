import React from "react";
import rightArrow from "../assets/right-arrow.png";
import "../css/Sidebar.css";

const Sidebar = ({ isOpen, user }) => {
  return (
    <div className={`sidebar-container ${isOpen ? "open" : ""}`}>
      <div className="sidebar-list-container">
        <ul className="sidebar-list">
          <li>
            <a href="/home">
              <p>Home</p>
              <img src={rightArrow} alt="right arrow" />
            </a>
          </li>
          <li>
            <a href="/about">
              <p>About</p>
              <img src={rightArrow} alt="right arrow" />
            </a>
          </li>

          <li>
            <a href={user === null ? "/login" : "/dashboard"}>
              <p>{user === null ? "Login" : "Dashboard"}</p>
              <img src={rightArrow} alt="right arrow" />
            </a>
          </li>
          <li>
            <a href={user === null ? "/signup" : "/logout"}>
              <p>{user === null ? "Sign up" : "Log out"}</p>
              <img src={rightArrow} alt="right arrow" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
