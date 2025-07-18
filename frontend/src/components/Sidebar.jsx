import React from "react";
import rightArrow from "../assets/right-arrow.png";
import "../css/Sidebar.css";
import { ChevronRight } from "lucide-react";

const Sidebar = ({ isOpen, user }) => {
  return (
    <div className={`sidebar-container ${isOpen ? "open" : ""}`}>
      <div className="sidebar-list-container">
        <ul className="sidebar-list">
          <li>
            <a href="/">
              <p>Home</p>
              {/* <img src={rightArrow} alt="right arrow" /> */}
              <ChevronRight size={18} strokeWidth={2} />
            </a>
          </li>
          <li>
            <a href="/about">
              <p>About</p>
              {/* <img src={rightArrow} alt="right arrow" /> */}
              <ChevronRight size={18} strokeWidth={2} />
            </a>
          </li>

          <li>
            <a href={user === null ? "/login" : "/dashboard"}>
              <p>{user === null ? "Login" : "Dashboard"}</p>
              <ChevronRight size={18} strokeWidth={2} />
            </a>
          </li>
          <li>
            <a href={user === null ? "/signup" : "/logout"}>
              <p>{user === null ? "Sign up" : "Log out"}</p>
              <ChevronRight size={18} strokeWidth={2} />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
