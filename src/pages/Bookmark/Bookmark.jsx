import React from "react";
import { UsersPost } from "../../components";
import "../Bookmark/bookmark.css";

export const Bookmark = () => {
  return (
    <div className="bookmark-page-container flex-center flex-direction-column">
      <h2 className="bookmark-heading">Your Bookmarks</h2>
      <div className="bookmark-list flex-center flex-direction-column">
        <UsersPost />
        <UsersPost />
        <UsersPost />
      </div>
    </div>
  );
};
