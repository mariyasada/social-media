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
        {bookmarks.map((bookmark) => {
          return <UsersPost Post={bookmark.post} key={bookmark.post.id} />;
        })}
      </div>
    </div>
  );
};
