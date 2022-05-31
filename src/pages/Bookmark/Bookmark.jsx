import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UsersPost, Loader } from "../../components";
import { FetchComments, getPosts } from "../../redux/post/postSlice";
import { getBookmarks } from "../../redux/bookmark/bookmarkSlice";
import "../Bookmark/bookmark.css";

export const Bookmark = () => {
  const dispatch = useDispatch();
  useEffect(async () => {
    try {
      dispatch(getPosts());
      dispatch(getBookmarks());
      dispatch(FetchComments());
    } catch (err) {
      console.log(err, "could not complete the request");
    }
  }, [dispatch]);

  const { bookmarks, getbookmarkStatus } = useSelector(
    (state) => state.bookmark
  );

  return (
    <div className="bookmark-page-container flex-center flex-direction-column">
      <h2 className="bookmark-heading">Your Bookmarks</h2>
      <div className="bookmark-list flex-center flex-direction-column">
        {bookmarks.map((bookmark) => {
          return <UsersPost Post={bookmark.post} key={bookmark.post.id} />;
        })}
      </div>
      <div className="loader homepage">
        {getbookmarkStatus === "loading" && <Loader />}
      </div>
    </div>
  );
};
