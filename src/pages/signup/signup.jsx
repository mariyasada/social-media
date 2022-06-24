import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "../../components/icons";
import { initialSignUpData } from "../../constants/auth-Constants";
import "../signup/signup.css";
import { signUp } from "../../redux/auth/authslice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

export const Signup = () => {
  const [isShow, setShow] = useState(true);
  const [isconfShow, setConfShow] = useState(true);
  const [errmessage, seterrMessage] = useState("");
  const [signupData, setSignupData] = useState(initialSignUpData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { signupstatus } = useSelector((state) => state.auth);

  const signupDataChangeHandler = (e) => {
    seterrMessage("");
    const { name, value } = e.target;
    setSignupData((prevData) => ({ ...prevData, [name]: value }));
  };
  const passwordMathcingHandler = async (e, pwd1, pwd2) => {
    if (
      signupData.firstName === "" ||
      signupData.lastName === "" ||
      signupData.email === "" ||
      signupData.password === "" ||
      signupData.username === ""
    ) {
      toast("fill the data in all filelds", { icon: "✔" });
    } else {
      if (pwd1.length < 6) {
        e.preventDefault();
        seterrMessage("password must be 7 character long ");
      } else if (pwd1 === pwd2) {
        e.preventDefault();
        seterrMessage(" ");
        try {
          await dispatch(signUp(signupData)).unwrap();
          setSignupData(initialSignUpData);
          navigate("/home");
          toast("successfully signed up", { icon: "✔" });
        } catch (err) {
          console.log(err);
        }
      } else {
        e.preventDefault();
        seterrMessage("password and confirmpassord doesn't match");
        navigate("/signup");
      }
    }
  };
  return (
    <div className="background">
      <div className="signup-page-container border-round">
        <h2>CREATE ACCOUNT</h2>
        <form className="signup-form">
          <div className="label-input-container flex-center flex-direction-column">
            <label htmlFor="Name" className="label-for-login ">
              First Name
            </label>
            <input
              type="text"
              placeholder="First Name"
              className="input-textbox input-signup"
              id="FirstName"
              name="firstName"
              required
              onChange={(e) => signupDataChangeHandler(e)}
            />
          </div>
          <div className="label-input-container flex-center flex-direction-column ">
            <label htmlFor="Name" className="label-for-login ">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Last Name"
              className="input-textbox input-signup"
              id=" LastName"
              name="lastName"
              required
              onChange={(e) => signupDataChangeHandler(e)}
            />
          </div>
          <div className="label-input-container flex-center flex-direction-column ">
            <label htmlFor="email" className="label-for-login ">
              Email
            </label>
            <input
              type="text"
              placeholder="abc@gmail.com"
              className="input-textbox input-signup"
              id="email"
              name="email"
              required
              onChange={(e) => signupDataChangeHandler(e)}
            />
          </div>
          <div className="label-input-container flex-center flex-direction-column ">
            <label htmlFor="username" className="label-for-login ">
              Username
            </label>
            <input
              type="text"
              placeholder="abc@gmail.com"
              className="input-textbox input-signup"
              id="username"
              name="username"
              required
              onChange={(e) => signupDataChangeHandler(e)}
            />
          </div>
          <div className="label-input-container flex-center flex-direction-column ">
            <label htmlFor="password" className="label-for-login ">
              Password
            </label>
            <input
              type={isShow ? "password" : "text"}
              placeholder="*********"
              className="input-textbox input-signup"
              id="password"
              name="password"
              required
              onChange={(e) => signupDataChangeHandler(e)}
            />
            <span className="show-hide-toggle-icon password-badge flex-center">
              {isShow ? (
                <FaEyeSlash onClick={() => setShow(!isShow)} />
              ) : (
                <FaEye onClick={() => setShow(!isShow)} />
              )}
            </span>
          </div>
          <div className="label-input-container flex-center flex-direction-column">
            <label htmlFor="Confirm password" className="label-for-login ">
              Confirm Password
            </label>
            <input
              type={isconfShow ? "password" : "text"}
              placeholder="*********"
              className="input-textbox input-signup"
              id="Confirm password"
              name="confirmpassword"
              required
              onChange={(e) => signupDataChangeHandler(e)}
            />
            <span className="show-hide-toggle-icon confirm-password-badge flex-center">
              {isconfShow ? (
                <FaEyeSlash onClick={() => setConfShow(!isconfShow)} />
              ) : (
                <FaEye onClick={() => setConfShow(!isconfShow)} />
              )}
            </span>
          </div>
          <p className="error-msg">{errmessage}</p>
          <span>
            <button
              className="btn login-btn border-round"
              onClick={(e) =>
                passwordMathcingHandler(
                  e,
                  signupData.password,
                  signupData.confirmpassword
                )
              }
            >
              {signupstatus === "loading" ? "Saving Data..." : "Register"}
            </button>
          </span>

          <div className="new-user-link-container flex-center">
            <p>Already Registered ? </p>
            <Link to="/login" className="signup-link">
              Log In Here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
