import React from "react";
import { useAuth } from "../../contexts";
import { FaUserAlt, FiLogOut, FaUserCircle } from "../icons";
import "../Humburger/humburger.css";
import { sidebarMenu } from "../../constants/sidebarConstant";
import { NavLink } from "react-router-dom";

export const Humburger = () => {
  const {
    user: { isLoggedIn },
    signOutHandler,
  } = useAuth();
  const getActiveStyle = ({ isActive }) => ({
    color: isActive ? "red" : "",
  });
  return (
    <div>
      <ul className="hamburger-menu-container">
        {sidebarMenu.map(({ Icon, path, name }) => {
          return (
            <NavLink
              to={`${path}`}
              key={name}
              className="hamburger-menu-item flex-center flex-direction-column"
              style={getActiveStyle}
            >
              <li className="hamburger-item flex-center">
                <Icon.type />
                {name}
              </li>
            </NavLink>
          );
        })}
        {isLoggedIn && (
          <NavLink
            to="/profile"
            className="hamburger-menu-item flex-center flex-direction-column"
            style={getActiveStyle}
          >
            <li className="hamburger-item flex-center">
              <FaUserCircle />
              Profile
            </li>
          </NavLink>
        )}
        {isLoggedIn ? (
          <NavLink
            to="/"
            className="hamburger-menu-item flex-center flex-direction-column"
            onClick={signOutHandler}
          >
            <li className="hamburger-item flex-center">
              <FiLogOut onClick={signOutHandler} />
              Logout
            </li>
          </NavLink>
        ) : (
          <NavLink
            to="/login"
            className="hamburger-menu-item"
            style={getActiveStyle}
          >
            <li className="hamburger-item flex-center">
              <FaUserAlt />
              Login
            </li>
          </NavLink>
        )}
      </ul>
    </div>
  );
};
