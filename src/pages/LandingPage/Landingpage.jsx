import React from "react";
import "./landingpage.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const LandingPage = () => {
  const { isUserLoggedIn } = useSelector((state) => state.auth);
  return (
    <div className="home-page flex-center">
      <div className="image-container flex-center">
        <img src="../assets/banner4.png" alt="social-connect" />
      </div>
      <div className="text-and-button-container flex-center">
        <span className="quote-container">
          <p>Share your thoughts with people. </p>
        </span>
        <span>
          <Link to={isUserLoggedIn ? "/home" : "/login"}>
            <button className="btn btn-homepage border-round">Join Now</button>
          </Link>
        </span>
      </div>
    </div>
  );
};
