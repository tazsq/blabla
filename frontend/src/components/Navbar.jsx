import { ChevronRight, PlusCircle, Search } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
import profile from "../assets/profile.png";
import "../css/Navbar.css";
import Greeting from "./Greeting";
import Sidebar from "./Sidebar";
import UserContext from "../contexts/UserContext";

function Navbar() {
  const { user, handleLogout } = useContext(UserContext);
  const [dropped, setDropped] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 769);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // useEffect(() => {
  //   function handleResize() {
  //     setIsMobile(window.innerWidth < 769);
  //   }

  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);
  function handleResize() {
    setIsMobile(window.innerWidth < 769);
  }
  function toggleSidebar() {
    setSidebarOpen(!sidebarOpen);
  }
  window.addEventListener("resize", handleResize);

  function handleDropdownClick() {
    setDropped(!dropped);
    // document
    //   .querySelector(".dropdown-wrapper")
    //   .classList.toggle("hide-dropdown");
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
      {/* <div className="logo-flex">
        <img src={logo} alt="logo" className="logo" />
        <h1>SathChalo</h1>
      </div> */}

      <div className="new-logo-cont">
        <div className="new-logo">
          <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <h2>RideOn</h2>
      </div>

      {user !== null && (
        <div className="nav-right">
          <div className="nav-search">
            {/* <a href="/" title="Search" className="search-flex"> */}
            <Link to="/find" className="search-flex">
              <div className="nav-logo">
                {/* <img src={searchLogo} alt="search" /> */}
                <Search size={20} strokeWidth={1.5} />
              </div>
              <div className="search-flex mobile-search_text">Search</div>
            </Link>
            {/* </a> */}
          </div>
          <div className="nav-search">
            {/* <a href="/publish-ride" title="Search" className="search-flex"> */}
            <Link to="/create" className="search-flex">
              <div className="nav-logo">
                {/* <img src={plus} alt="" /> */}
                <PlusCircle size={22} strokeWidth={1.5} />
              </div>
              <div className="search-flex mobile-publish_text">
                Publish a ride
              </div>
            </Link>
            {/* </a> */}
          </div>
        </div>
      )}
      {!isMobile &&
        (user === null ? (
          <div className="nav-search">
            <div className="profile-wrapper" onClick={handleDropdownClick}>
              <img src={profile} alt="" className="nav-logo-new" />
              {/* <img
                src={dropped ? upArrow : downArrow}
                alt={dropped ? "up arrow" : "down arrow"}
                className="nav-logo"
              /> */}

              <div className="nav-logo-new">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    transform: dropped ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                    cursor: "pointer",
                  }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>
            <div
              className={`dropdown-wrapper ${!dropped ? "hide-dropdown" : ""}`}
            >
              <ul>
                <a href="/">
                  <li className="list-item">
                    {/* <div className="list-item-wrap"> */}
                    {/* <Link to="/" style={{ padding: 5 }}> */}
                    <span>Log in</span>
                    {/* </Link> */}
                    <ChevronRight size={18} strokeWidth={2} />
                    {/* </div> */}
                  </li>
                </a>
                <a href="/signup">
                  {" "}
                  <li className="list-item">
                    {/* <div className="list-item-wrap"> */}
                    {/* <Link to="/signup" style={{ padding: 5 }}> */}
                    <span>Sign up</span>
                    {/* </Link> */}
                    <ChevronRight size={18} strokeWidth={2} />
                    {/* </div> */}
                  </li>
                </a>
              </ul>
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
