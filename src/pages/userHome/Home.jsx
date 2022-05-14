import React from "react";
import { CreatePost, FilterBar, UserList, UsersPost } from "../../components";
import { usePosts } from "../../contexts";
import "../userHome/Home.css";

export const Home = () => {
  const { state } = usePosts();
  const { postsList, userList } = state;
  return (
    <div className="home-page-container flex-center">
      {/* create post and latest post conatiner */}
      <div className="home-feed-container flex-center flex-direction-column">
        <CreatePost />
        <FilterBar />
        <h1 className="heading-of-post">Latest Posts</h1>
        <div className="userpost-container flex-center flex-direction-column">
          {postsList.map((userpost) => {
            return <UsersPost Post={userpost} key={userpost._id} />;
          })}
        </div>
      </div>
      <div className="user-list-container">
        <UserList />
      </div>
    </div>
  );
};
