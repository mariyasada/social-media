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
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../../redux/post/postSlice";

export const UsersPost = ({ Post, setPostData, setIsEditing }) => {
  const { user } = useSelector((store) => store.auth);
  const { pathname } = useLocation();
  const [isShow, setShow] = useState(false);
  const dispatch = useDispatch();

  // console.log(Post);
  // console.log(setIsEditing);

  const seteditData = (Post) => {
    setIsEditing(true);
    setPostData(Post);
  };
  return (
    <div className="user-post-comment-container flex-center flex-direction-column border-round">
      <div className="user-post flex-center border-round">
        <div className="profilepic-container">
          <img
            className="avatar avatar-xsm"
            src={
              Post.user.photoURL
                ? Post.user.photoURL
                : "https://picsum.photos/200"
            }
            alt="user profile"
          />
        </div>
        <div className="username-and-more-option flex-center flex-direction-column">
          <div className="username-and-icon flex-center">
            <p className="username-from-posts">{Post.user.username}</p>
            <span className="more-options">
              {pathname === "/profile" ? (
                <FaTrash
                  className="more-option-icon"
                  title="Delete"
                  onClick={
                    user.username === Post.user.username
                      ? () => dispatch(deletePost(Post.id))
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

            {user.username === Post.user.username && (
              <span className="background-of-icon flex-center">
                <Link to="/home">
                  <FaEdit
                    className="action-icons"
                    title="Edit"
                    onClick={
                      user.username === Post.user.username
                        ? () => seteditData(Post)
                        : null
                    }
                  />
                </Link>
              </span>
            )}
          </div>
        </div>
        <hr />
      </div>
      {isShow && <CommentSection />}
    </div>
  );
};
