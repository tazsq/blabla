import { use, useState } from "react";
import "../css/Navbar.css";
import logo from "../assets/logo.png";
import searchLogo from "../assets/search.png";
import plus from "../assets/plus.png";
import profile from "../assets/profile.png";
import downArrow from "../assets/down-arrow.png";
import upArrow from "../assets/up-arrow.png";
import Sidebar from "./Sidebar";
import Greeting from "./Greeting";

function Navbar(props) {
  const { user, handleLogout } = props;
  const [dropped, setDropped] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 769);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function handleResize() {
    setIsMobile(window.innerWidth < 769);
  }
  function toggleSidebar() {
    setSidebarOpen(!sidebarOpen);
  }
  window.addEventListener("resize", handleResize);

  function handleDropdownClick() {
    setDropped(!dropped);
    document
      .querySelector(".dropdown-wrapper")
      .classList.toggle("hide-dropdown");
  }
  return (
    <div className="navbar-css pos-relative">
      {isMobile &&
        (sidebarOpen ? (
          <button className="close-sidebar-btn" onClick={toggleSidebar}>
            &times;
          </button>
        ) : (
          <button className="open-sidebar-btn" onClick={toggleSidebar}>
            &#9776;
          </button>
        ))}
      {isMobile && <Sidebar isOpen={sidebarOpen} user={user} />}
      <div className="logo-flex">
        <img src={logo} alt="logo" className="logo" />
        <h1>SathChalo</h1>
      </div>
      <div className="nav-right">
        <div className="nav-search">
          <a href="/" title="Search" className="search-flex">
            <div className="nav-logo">
              <img src={searchLogo} alt="search" />
            </div>
            <div className="search">Search</div>
          </a>
        </div>
        <div className="nav-search">
          <a href="/publish-ride" title="Search" className="search-flex">
            <div className="nav-logo">
              <img src={plus} alt="" />
            </div>
            <div className="search">Publish a ride</div>
          </a>
        </div>
      </div>
      {!isMobile &&
        (user === null ? (
          <div className="nav-search">
            <div className="profile-wrapper" onClick={handleDropdownClick}>
              <img src={profile} alt="" className="nav-logo" />
              <img
                src={dropped ? upArrow : downArrow}
                alt={dropped ? "up arrow" : "down arrow"}
                className="nav-logo"
              />
            </div>
            <div className="dropdown-wrapper hide-dropdown">
              <li className="list-item">Login</li>
              <li className="list-item">Sign up</li>
            </div>
            {dropped && (
              <div
                className="dropdown-overlay"
                onClick={handleDropdownClick}
              ></div>
            )}
          </div>
        ) : (
          <Greeting user={user} handleLogout={handleLogout} />
        ))}
    </div>
  );
}

export default Navbar;
