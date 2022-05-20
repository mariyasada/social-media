import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CreatePost, FilterBar, UserList, UsersPost } from "../../components";
import postSlice, { getPosts } from "../../redux/post/postSlice";
import "../userHome/Home.css";

export const Home = () => {
  const [postData, setPostData] = useState({ content: "" });
  const [isEditing, setIsEditing] = useState(false);
  const { Posts } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(async () => {
    try {
      dispatch(getPosts());
    } catch (err) {
      console.log(err, "could not complete the request");
    }
  }, [dispatch]);
  return (
    <div className="home-page-container flex-center">
      {/* create post and latest post conatiner */}
      <div className="home-feed-container flex-center flex-direction-column">
        <CreatePost
          postData={postData}
          setPostData={setPostData}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
        <FilterBar />
        <h1 className="heading-of-post">Latest Posts</h1>
        <div className="userpost-container flex-center flex-direction-column">
          {Posts.map((post) => {
            return (
              <UsersPost
                key={post.id}
                Post={post}
                setPostData={setPostData}
                setIsEditing={setIsEditing}
              />
            );
          })}
        </div>
      </div>
      <div className="user-list-container">
        <UserList />
      </div>
    </div>
  );
};
