import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

// Import image files
import flagImage from "./Assets/Flag.png"; 
import profilePic from "./Assets/Profile.jpg"; 

function Navbar() {
  // State to control visibility of the search bar
  const [showSearchBar, setShowSearchBar] = useState(false);

  // Toggle search bar visibility
  const toggleSearchBar = () => setShowSearchBar((prev) => !prev);

  return (
    <div className="navbar">
      {/* Left Section */}
      <div className="navbar-left">
        <div className="logo">
          <Link to="/" className="logo-link"> 
            <span className="logo-text">
              Unify <span className="pos-text">TM</span>
            </span>
          </Link>
        </div>
      </div>

      {/* Center Section */}
      <div className="navbar-center"></div>

      {/* Right Section */}
      <div className="navbar-right">
        <span 
          className="icon" 
          aria-label="Search" 
          onClick={toggleSearchBar}
          style={{ position: 'relative', zIndex: 2 }} // Wrapping for proper positioning
        >
          <i className="fas fa-search"></i>
        </span>

        {/* Conditionally Render the Search Bar */}
        {showSearchBar && (
          <input 
            type="text" 
            className="small-search-bar" 
            placeholder="Search..."
            autoFocus 
            onBlur={() => setShowSearchBar(false)} // Hide the search bar when it loses focus
          />
        )}

        <span className="icon" aria-label="Language">
          <img src={flagImage} alt="Flag" className="flag-icon" />
        </span>
        <span className="icon notification" aria-label="Notifications">
          <i className="fas fa-bell"></i>
          <span className="badge">4</span>
        </span>
        <div className="profile">
          <img src={profilePic} alt="Profile" className="profile-pic" />
          <span className="status-dot"></span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
