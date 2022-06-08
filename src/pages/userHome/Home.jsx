import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CreatePost, Loader, UserList, UsersPost } from "../../components";
import postSlice, { FetchComments, getPosts } from "../../redux/post/postSlice";
import { getBookmarks } from "../../redux/bookmark/bookmarkSlice";
import "../userHome/Home.css";

export const Home = () => {
  const [postData, setPostData] = useState({ content: "" });
  const [imgUrl, setImgUrl] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const { Posts, status, getPostStatus } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(async () => {
    try {
      dispatch(getPosts());
      dispatch(getBookmarks());
      dispatch(FetchComments());
    } catch (err) {
      console.log(err, "could not complete the request");
    }
  }, [dispatch]);

  const postByFollowedUser = Posts.filter(
    (post) => user.following?.includes(post.userId) || post.userId === user.id
  );

  const filteredPostOfFollowedUser = postByFollowedUser.sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );
  console.log(filteredPostOfFollowedUser);

  return (
    <div className="home-page-container flex-center">
      {/* create post and latest post conatiner */}
      <div className="home-feed-container flex-center flex-direction-column">
        <CreatePost
          postData={postData}
          setPostData={setPostData}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          imgUrl={imgUrl}
          setImgUrl={setImgUrl}
        />
        <h1 className="heading-of-post">Latest Posts</h1>
        <div className="userpost-container flex-center flex-direction-column">
          {postByFollowedUser.length === 0 ? (
            <p className="text-to-show">you are not following any user</p>
          ) : (
            postByFollowedUser
              .map((post) => {
                return (
                  <UsersPost
                    key={post.id}
                    Post={post}
                    setPostData={setPostData}
                    setIsEditing={setIsEditing}
                    isEditing={isEditing}
                    setImgUrl={setImgUrl}
                    imgUrl={imgUrl}
                  />
                );
              })
              .reverse()
          )}
        </div>
      </div>
      <div className="user-list-container">
        <UserList />
      </div>
      <div className="loader homepage">
        {status === "loading" || (getPostStatus === "loading" && <Loader />)}
      </div>
    </div>
  );
};
