import React from "react";
import { sidebarMenu } from "../../constants/sidebarConstant";
import { NavLink } from "react-router-dom";
import "../sidebar/sidebar.css";
import { useSelector } from "react-redux";

export const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const getActivestylelink = ({ isActive }) => ({
    background: isActive ? "#b4cece" : "",
  });
  return (
    <aside className="sidebar-item-container ">
      <ul className="item-container flex-center flex-direction-column">
        {sidebarMenu.map(({ Icon, path, name }) => {
          return (
            <NavLink
              to={
                name === "Profile" ? `${path.concat(`/${user.id}`)}` : `${path}`
              }
              key={name}
              className="sidebar-item-with-icon flex-center"
              style={getActivestylelink}
            >
              <Icon.type className="sidebar-icon" />
              <h3 className="sidebar-item-title">{name}</h3>
            </NavLink>
          );
        })}
      </ul>
    </aside>
  );
};
