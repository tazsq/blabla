import React from "react";
import rightArrow from "../assets/right-arrow.png";
import "../css/Sidebar.css";

const Sidebar = ({ isOpen }) => {
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
            <a href="/login">
              <p>Login</p>
              <img src={rightArrow} alt="right arrow" />
            </a>
          </li>
          <li>
            <a href="/signup">
              <p>Sign up</p>
              <img src={rightArrow} alt="right arrow" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
