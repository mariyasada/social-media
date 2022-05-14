import React from "react";
import "./landingpage.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/index";

export const LandingPage = () => {
  const {
    user: { isLoggedIn },
  } = useAuth();
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
          <Link to={isLoggedIn ? "/home" : "/login"}>
            <button className="btn btn-homepage border-round">Join Now</button>
          </Link>
        </span>
      </div>
    </div>
  );
};