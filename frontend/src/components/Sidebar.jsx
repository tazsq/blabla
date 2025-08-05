import React, { useContext } from "react";
import rightArrow from "../assets/right-arrow.png";
import "../css/Sidebar.css";
import { ChevronRight } from "lucide-react";
import UserContext from "../contexts/UserContext";

const Sidebar = ({ isOpen }) => {
  const { user, handleLogout } = useContext(UserContext);
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
            {user == null ? (
              <a href="/login">
                <p>Login</p>
                <ChevronRight size={18} strokeWidth={2} />
              </a>
            ) : (
              <a href="/dashboard">
                <p>Dashboard</p>
                <ChevronRight size={18} strokeWidth={2} />
              </a>
            )}
          </li>
          <li>
            {user == null ? (
              <a href="/signup">
                <p>Sign up</p>
                <ChevronRight size={18} strokeWidth={2} />
              </a>
            ) : (
              <a onClick={handleLogout}>
                <p>Log out</p>
                <ChevronRight size={18} strokeWidth={2} />
              </a>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
