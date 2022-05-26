import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UsersPost } from "../../components";
import "../Bookmark/bookmark.css";

export const Bookmark = () => {
  const { bookmarks } = useSelector((state) => state.bookmark);
  return (
    <div className="bookmark-page-container flex-center flex-direction-column">
      <h2 className="bookmark-heading">Your Bookmarks</h2>
      <div className="bookmark-list flex-center flex-direction-column">
        {bookmarks.map((post) => {
          return <UsersPost Post={post} key={post.id} />;
        })}
      </div>
    </div>
  );
};
