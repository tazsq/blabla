import React from "react";
import { useState } from "react";
import "../css/Navbar.css";
import logo from "../assets/logo.png";
import searchLogo from "../assets/search.png";
import plus from "../assets/plus.png";
import profile from "../assets/profile.png";
import downArrow from "../assets/down-arrow.png";
import upArrow from "../assets/up-arrow.png";

function Navbar() {
  const [dropped, setDropped] = useState(false);

  function handleDropdownClick() {
    setDropped(!dropped);
    document
      .querySelector(".dropdown-wrapper")
      .classList.toggle("hide-dropdown");
  }
  return (
    <div className="navbar-css pos-relative">
      <div className="logo-flex">
        <img src={logo} alt="logo" className="logo" />
        <h1>SathChalo</h1>
      </div>
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
          <li className="list-item">login</li>
          <li className="list-item">signup</li>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
