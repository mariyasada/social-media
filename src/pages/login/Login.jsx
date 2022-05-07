import React, { useState } from "react";
import "../login/login.css";
import { FaEye, FaEyeSlash } from "../../components/icons";
import { Link } from "react-router-dom";
import "../signup/signup.css";
import { guestData, initialLogInData } from "../../constants/auth-Constants";
import { useAuth } from "../../contexts/auth-context";

export const Login = () => {
  const [isShow, setShow] = useState(true);
  const [logInData, setLogInData] = useState(initialLogInData);
  const { logInHandler } = useAuth();

  const logInChangeHandler = (e) => {
    const { name, value } = e.target;
    setLogInData((prevdata) => ({ ...prevdata, [name]: value }));
  };
  return (
    <div className="login-container-with-image flex-center">
      <div className="login-image-container">
        <img
          className="connection"
          alt="conncting with people"
          src="../assets/connect2.png"
        />
      </div>
      <div className="login-form-container border-round">
        <h2>Log In</h2>
        <form className="login-form">
          <div className="label-input-container flex-center flex-direction-column">
            <label htmlFor="username" className="label-for-login ">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="JohnDeo"
              className="input-textbox input-signup"
              id="username"
              required
              onChange={(e) => logInChangeHandler(e)}
            />
          </div>
          <div className="label-input-container flex-center flex-direction-column">
            <label htmlFor="password" className="label-for-login ">
              Password
            </label>
            <input
              type={isShow ? "password" : "text"}
              name="password"
              placeholder="*********"
              className="input-textbox input-signup"
              id="password"
              onChange={(e) => logInChangeHandler(e)}
              required
            />
            <span className="show-hide-toggle-icon login-badge flex-center">
              {isShow ? (
                <FaEyeSlash onClick={() => setShow(!isShow)} />
              ) : (
                <FaEye onClick={() => setShow(!isShow)} />
              )}
            </span>
          </div>
          <span>
            <button
              className="btn login-btn border-round"
              onClick={(e) => {
                e.preventDefault(), logInHandler(logInData);
              }}
            >
              Login
            </button>
          </span>
          <span>
            <button
              className="btn login-btn-outline border-round"
              onClick={(e) => {
                e.preventDefault(), logInHandler(guestData);
              }}
            >
              Login As Guest
            </button>
          </span>
          <div className="new-user-link-container flex-center">
            <p>New User ?</p>
            <Link to="/signup" className="signup-link">
              Register Here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
