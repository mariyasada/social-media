import React from "react";
import { FaUserAlt, FiLogOut, FaUserCircle } from "../icons";
import "../Humburger/humburger.css";
import { sidebarMenu } from "../../constants/sidebarConstant";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserLogOut } from "../../redux/auth/authslice";
import toast from "react-hot-toast";

export const Humburger = () => {
  const { isUserLoggedIn, user } = useSelector((state) => state.auth);
  const getActiveStyle = ({ isActive }) => ({
    color: isActive ? "red" : "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signoutHnadler = async (e) => {
    try {
      e.preventDefault();
      await dispatch(setUserLogOut());
      navigate("/");
      toast("sucessfully logout", { icon: "✔" });
    } catch (err) {
      console.log(err);
      toast("could not complete the request", { icon: "❌" });
    }
  };
  return (
    <div>
      <ul className="hamburger-menu-container">
        {sidebarMenu.map(({ Icon, path, name }) => {
          return (
            <NavLink
              to={
                name === "Profile" ? `${path.concat(`/${user.id}`)}` : `${path}`
              }
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
        {isUserLoggedIn ? (
          <NavLink
            to="/"
            className="hamburger-menu-item flex-center flex-direction-column"
          >
            <li
              className="hamburger-item flex-center"
              onClick={(e) => signoutHnadler(e)}
            >
              <FiLogOut />
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
