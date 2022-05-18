import React, { useState } from "react";
import "../usersPost/userspost.css";
import {
  FaEdit,
  FaRegBookmark,
  FaRegComment,
  FaRegHeart,
  FaTrash,
  FiShare2,
  IoSend,
  BsThreeDots,
  FaBookmark,
  FaHeart,
} from "../icons";
import { CommentSection } from "../commentsection/comment";
import { Link, useLocation } from "react-router-dom";
import { useAuth, usePosts } from "../../contexts";

export const UsersPost = ({ Post }) => {
  const {
    user: { userData },
  } = useAuth();
  const {
    state: { postsList, bookmarkList },
    deletePostHandler,
    setPostData,
    setIsEditing,
    addPostToBookmark,
    removePostFromBookmark,
    likedPostHandler,
    dislikePostHandler,
  } = usePosts();
  const { pathname } = useLocation();
  const [isShow, setShow] = useState(false);

  const seteditData = (post) => {
    setIsEditing(true);
    setPostData(post);
  };
  // console.log(postsList, "liked count from post");
  return (
    <div className="user-post-comment-container flex-center flex-direction-column border-round">
      <div className="user-post flex-center border-round">
        <div className="profilepic-container">
          <img
            className="avatar avatar-xsm"
            src={
              Post.username === userData.username
                ? userData.profile
                  ? userData.profile
                  : "https://iqra-ui.netlify.app/images/blank.png"
                : Post.profile
            }
            alt="user profile"
          />
        </div>
        <div className="username-and-more-option flex-center flex-direction-column">
          <div className="username-and-icon flex-center">
            <p className="username-from-posts">{Post.username}</p>
            <span className="more-options">
              {pathname === "/profile" ? (
                <FaTrash
                  className="more-option-icon"
                  title="more options"
                  onClick={
                    Post.username === userData.username
                      ? () => deletePostHandler(Post)
                      : null
                  }
                />
              ) : (
                <BsThreeDots
                  className="more-option-icon"
                  title="more options"
                />
              )}
            </span>
          </div>
          <div className="users-post-details-container">
            <div className="details">
              <p>{Post.content}</p>
            </div>
          </div>
          {/* {console.log(Post, "bookmark")} */}
          {Post.likes.likeCount === 0 ? (
            ""
          ) : (
            <div className="userspost-likeCount flex-center">
              <span> {Post.likes.likeCount} Likes</span>
            </div>
          )}
          <div className="user-post-icons-container flex-center">
            <span className="background-of-icon flex-center">
              {Post.likes.likedBy.some(
                (item) => item.username === userData.username
              ) ? (
                <FaHeart
                  className="action-icons color-red"
                  title="dislike"
                  onClick={() => dislikePostHandler(Post)}
                />
              ) : (
                <FaRegHeart
                  className="action-icons"
                  title="Like"
                  onClick={() => likedPostHandler(Post)}
                />
              )}
            </span>
            <span className="background-of-icon flex-center">
              <FaRegComment
                className="action-icons"
                onClick={() => setShow(!isShow)}
                title="Comment"
              />
            </span>
            <span className="background-of-icon flex-center">
              <FiShare2 className="action-icons" title="Share" />
            </span>
            <span className="background-of-icon flex-center">
              {bookmarkList.some((item) => item._id === Post._id) ? (
                <FaBookmark
                  className="action-icons"
                  title="BookMark"
                  onClick={() => removePostFromBookmark(Post)}
                />
              ) : (
                <FaRegBookmark
                  className="action-icons"
                  title="BookMark"
                  onClick={() => addPostToBookmark(Post)}
                />
              )}
            </span>
            {Post.username === userData.username && (
              <span className="background-of-icon flex-center">
                <Link to="/home">
                  <FaEdit
                    className="action-icons"
                    title="Edit"
                    onClick={
                      Post.username === userData.username
                        ? () => seteditData(Post)
                        : null
                    }
                  />
                </Link>
              </span>
            )}
          </div>
          {/* liked by username */}
          <div className="liked-by-container flex-center">
            <p className="likedby-username">
              {Post.likes.likeCount === 0
                ? " "
                : `liked by ${userData.username}`}
            </p>
          </div>
        </div>
        <hr />
      </div>
      {isShow && <CommentSection />}
    </div>
  );
};
