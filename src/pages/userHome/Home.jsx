import React from "react";
import { CreatePost, FilterBar, UserList, UsersPost } from "../../components";
import "../userHome/Home.css";

export const Home = () => {
  return (
    <div className="home-page-container flex-center">
      {/* create post and latest post conatiner */}
      <div className="home-feed-container flex-center flex-direction-column">
        <CreatePost />
        <FilterBar />
        <h1 className="heading-of-post">Latest Posts</h1>
        <div className="userpost-container flex-center flex-direction-column">
          <UsersPost />
          <UsersPost />
          <UsersPost />
          <UsersPost />
          <UsersPost />
          <UsersPost />
        </div>
      </div>
      <div className="user-list-container">
        <UserList />
      </div>
    </div>
  );
};
