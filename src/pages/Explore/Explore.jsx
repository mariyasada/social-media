import React from "react";
import { UserList, UsersPost } from "../../components";
import "../Explore/Explore.css";

export const Explore = () => {
  return (
    <div className="explore-page-container flex-center">
      <div className="userallpost-container flex-center flex-direction-column">
        <UsersPost />
        <UsersPost />
        <UsersPost />
        <UsersPost />
        <UsersPost />
        <UsersPost />
      </div>
      <div className="list-of-users-container">
        <UserList />
      </div>
    </div>
  );
};
