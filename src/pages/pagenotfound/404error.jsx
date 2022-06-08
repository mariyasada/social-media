import React from "react";
import { Link } from "react-router-dom";
import "./errorpage.css";

export const PageNotFound = () => {
  return (
    <div className="wrapper flex-center">
      <img
        src="https://ik.imagekit.io/qrhnvir8bf0/business-3d-task_slyFJoiA1.png?ik-sdk-version=javascript-1.4.3&updatedAt=1650277790401"
        alt="not-found"
        className="error-image-container"
      />
      <div className="errorpage-message flex-center ">
        <span className="error-status">404 </span>
        <p className="message-for-user">
          Aha!!! You see ! You can be wrong ! or it could be us you should
          probably &nbsp;
          <Link to="/home">
            <span className="link-to-homepage">Go to HomePage</span>
          </Link>
        </p>
      </div>
    </div>
  );
};
