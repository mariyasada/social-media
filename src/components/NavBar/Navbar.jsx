import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Humburger } from "../Humburger/Humburger";
import { BsSearch, MdMenu, GiCancel } from "../icons";
import "../NavBar/Navbar.css";
import { logOut } from "../../redux/auth/authslice";

export const Navbar = () => {
  const { isUserLoggedIn } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signoutHandler = async (e) => {
    try {
      e.preventDefault();
      await dispatch(logOut()).unwrap();
      navigate("/home");
    } catch (err) {
      console.log(err);
      toast("could not complete the request", { icon: "❌" });
    }
  };

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
          {isUserLoggedIn ? (
            <button
              className="btn nav-btn border-round"
              onClick={(e) => signoutHandler(e)}
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
