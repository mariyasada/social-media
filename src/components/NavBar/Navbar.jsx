import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Humburger } from "../Humburger/Humburger";
import { BsSearch, MdMenu, GiCancel } from "../icons";
import "../NavBar/Navbar.css";
import { setUserLogOut } from "../../redux/auth/authslice";
import toast from "react-hot-toast";

export const Navbar = () => {
  const { isUserLoggedIn } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const signoutHandler = async (e) => {
    try {
      e.preventDefault();
      await dispatch(setUserLogOut());
      navigate("/");
      toast("Successfully logout", { icon: "✔" });
    } catch (err) {
      console.log(err);
      toast("could not complete the request", { icon: "❌" });
    }
  };

  return (
    <nav className="header-container flex-center">
      <div className="menu-icon-and-logo-conatiner flex-center">
        {pathname !== "/login" && pathname !== "/signup" && (
          <div className="humburgermenu-icon">
            {isOpen ? (
              <GiCancel
                className="menu-icon"
                onClick={() => setIsOpen(!isOpen)}
              />
            ) : (
              <MdMenu
                className="menu-icon"
                onClick={() => setIsOpen(!isOpen)}
              />
            )}
          </div>
        )}
        <div className="logo-container" style={{ height: "100%" }}>
          <Link to="/">
            <img
              className="logo-image"
              src="../assets/logo.png"
              alt="instaconnect"
            />
          </Link>
        </div>
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
