import React, { useState, useEffect } from "react";
import "../css/Sidebar.css";

const Sidebar = (props) => {
  // const [isOpen, setIsOpen] = useState(false);
  // const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // const toggleSidebar = () => {
  //   setIsOpen(!isOpen);
  // };
  const { isOpen } = props;
  console.log(isOpen);
  return (
    <div className={`sidebar-container ${isOpen ? "open" : ""}`}>
      <div className="sidebar-list-container">
        <div className="sidebar-list">
          <div>
            <span>
              <a href="/home">Home</a>
            </span>
          </div>
          <div>
            <span>
              <a href="/about">About</a>
            </span>
          </div>
          <div>
            <span>
              <a href="/login">Login</a>
            </span>
          </div>
          <div>
            <span>
              <a href="/signup">Sign up</a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
