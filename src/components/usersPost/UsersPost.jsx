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
} from "../icons";
import { CommentSection } from "../commentsection/comment";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth, usePosts } from "../../contexts";

export const UsersPost = ({ Post }) => {
  const {
    user: { userData },
  } = useAuth();
  const {
    state: { postsList },
    deletePostHandler,
    postData,
    setPostData,
    isEditing,
    setIsEditing,
  } = usePosts();
  const { pathname } = useLocation();
  const [isShow, setShow] = useState(false);
  const navigate = useNavigate();

  const seteditData = (post) => {
    setIsEditing(true);
    setPostData(post);
  };
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
          <div className="user-post-icons-container flex-center">
            <span className="background-of-icon flex-center">
              <FaRegHeart className="action-icons" title="Like" />
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
              <FaRegBookmark className="action-icons" title="BookMark" />
            </span>
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
          </div>
        </div>
        <hr />
      </div>
      {isShow && <CommentSection />}
    </div>
  );
};
