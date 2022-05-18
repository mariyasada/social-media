import React from "react";
import { UsersPost } from "../../components";
import { usePosts } from "../../contexts";
import "../Bookmark/bookmark.css";

export const Bookmark = () => {
  const {
    state: { bookmarkList, postsList },
  } = usePosts();

  // const bookmarkedPost = postsList.map((post) =>
  //   bookmarkList.map((item) => item._id === post._id)
  // );

  // console.log(bookmarkedPost, "bookmarked cotext");

  return (
    <div className="bookmark-page-container flex-center flex-direction-column">
      <h2 className="bookmark-heading">Your Bookmarks</h2>
      <div className="bookmark-list flex-center flex-direction-column">
        {bookmarkList.map((userpost) => {
          return <UsersPost Post={userpost} key={userpost._id} />;
        })}
      </div>
    </div>
  );
};
