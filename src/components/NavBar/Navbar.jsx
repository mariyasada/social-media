import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/index";
import { Humburger } from "../Humburger/Humburger";
import { BsSearch, MdMenu, GiCancel } from "../icons";
import "../NavBar/Navbar.css";

export const Navbar = () => {
  const {
    user: { isLoggedIn },
    signOutHandler,
  } = useAuth();
  // const { isLoggedIn, userData } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  // console.log(userData, "helll");
  return (
    <nav className="header-container flex-center">
      <div className="menu-icon-and-logo-conatiner flex-center">
        <div className="humburgermenu-icon">
          {isOpen ? (
            <GiCancel
              className="menu-icon"
              onClick={() => setIsOpen(!isOpen)}
            />
          ) : (
            <MdMenu className="menu-icon" onClick={() => setIsOpen(!isOpen)} />
          )}
        </div>
        <div className="logo-container">
          <Link to="/">
            <img
              className="logo-image"
              src="../assets/logo.png"
              alt="instaconnect"
            />
          </Link>
        </div>
      </div>
      <div className="search-input-container flex-center">
        <BsSearch className="search-icon" />
        <input type="text" className="input-search" placeholder="Search" />
      </div>

      <div className="header-login-button-container">
        <span>
          {isLoggedIn ? (
            <button
              className="btn nav-btn border-round"
              onClick={(e) => {
                e.preventDefault(), signOutHandler();
              }}
            >
              Logout
            </button>
          ) : (
            <button
              className="btn nav-btn border-round"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
        </span>
      </div>
      {isOpen && <Humburger className="humburger-menu-container" />}
    </nav>
  );
};
