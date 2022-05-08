import React from "react";
import { sidebarMenu } from "../../constants/sidebarConstant";
import { NavLink } from "react-router-dom";
import "../sidebar/sidebar.css";
import { useAuth } from "../../contexts";
import { CgProfile } from "../icons";

export const Sidebar = () => {
  const {
    user: { isLoggedIn },
  } = useAuth();
  const getActivestylelink = ({ isActive }) => ({
    background: isActive ? "#b4cece" : "",
  });
  return (
    <aside className="sidebar-item-container ">
      <ul className="item-container flex-center flex-direction-column">
        {sidebarMenu.map(({ Icon, path, name }) => {
          return (
            <NavLink
              to={`${path}`}
              key={name}
              className="sidebar-item-with-icon flex-center"
              style={getActivestylelink}
            >
              <Icon.type className="sidebar-icon" />
              <h3 className="sidebar-item-title">{name}</h3>
            </NavLink>
          );
        })}
        {isLoggedIn && (
          <NavLink
            to="/"
            className="sidebar-item-with-icon flex-center"
            style={getActivestylelink}
          >
            <CgProfile className="sidebar-icon" />
            <h3 className="sidebar-item-title">Profile</h3>
          </NavLink>
        )}
      </ul>
    </aside>
  );
};
