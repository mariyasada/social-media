import React, { useState } from "react";
import "../login/login.css";
import { FaEye, FaEyeSlash } from "../../components/icons";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../signup/signup.css";
import { guestData, initialLogInData } from "../../constants/auth-Constants";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../../redux/auth/authslice";
import toast from "react-hot-toast";
import { Loader } from "../../components";

export const Login = () => {
  const [isShow, setShow] = useState(true);
  const [logInData, setLogInData] = useState(initialLogInData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginstatus } = useSelector((state) => state.auth);

  const logInChangeHandler = (e) => {
    const { name, value } = e.target;
    setLogInData((prevdata) => ({ ...prevdata, [name]: value }));
  };

  const logInHandler = async (e) => {
    try {
      if (logInData.email === "" || logInData.password === "") {
        toast("please enter the data in both fields", { icon: "✔" });
        navigate("/login");
      } else {
        e.preventDefault();
        await dispatch(logIn(logInData)).unwrap();
        navigate("/home");
        toast("suceessfully login", { icon: "✔" });
      }
    } catch (err) {
      console.log(err);
      Navigate("/login");
    }
  };
  const guestLoginHandler = async (e) => {
    try {
      e.preventDefault();
      await dispatch(logIn(guestData)).unwrap();
      navigate("/home");
      toast("suceessfully login", { icon: "✔" });
    } catch (err) {
      console.log(err);
      toast("could not complete the request", { icon: "❌" });
    }
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
              Email
            </label>
            <input
              type="text"
              name="email"
              placeholder="JohnDeo@gmail.com"
              className="input-textbox input-signup"
              id="email"
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
              onClick={logInHandler}
            >
              Login
            </button>
          </span>
          <span>
            <button
              className="btn login-btn-outline border-round"
              onClick={guestLoginHandler}
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
      <div className="loader">{loginstatus === "loading" && <Loader />}</div>
    </div>
  );
};
