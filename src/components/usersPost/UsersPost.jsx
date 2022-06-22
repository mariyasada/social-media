import React, { useState } from "react";
import "../usersPost/userspost.css";
import {
  FaEdit,
  FaRegBookmark,
  FaRegComment,
  FaRegHeart,
  FaTrash,
  FiShare2,
  BsThreeDots,
  FaBookmark,
  FaHeart,
} from "../icons";
import { CommentSection, Loader } from "../../components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  LikedPost,
  disLikedPost,
} from "../../redux/post/postSlice";
import {
  addToBookmark,
  deletePostFromBookmark,
} from "../../redux/bookmark/bookmarkSlice";
import toast from "react-hot-toast";

export const UsersPost = ({
  Post,
  setPostData,
  setIsEditing,
  isEditing,
  setImgUrl,
  imgUrl,
}) => {
  const { user } = useSelector((state) => state.auth);
  const {
    deletePostStatus,
    likedPostStatus,
    dislikedPostStatus,
    addCommentStatus,
  } = useSelector((state) => state.post);
  const { bookmarks, status, deletebookmarkStatus } = useSelector(
    (state) => state.bookmark
  );
  const { pathname } = useLocation();
  const [isShow, setShow] = useState(false);
  const dispatch = useDispatch();

  const seteditData = (Post) => {
    setIsEditing(true);
    if (Post.imgUrl === undefined) {
      setPostData(Post);
    } else {
      setPostData(Post);
      setImgUrl(Post.imgUrl);
    }
    toast("go to the text editor", { icon: "✔" });
  };
  const bookmarkId = bookmarks.find(
    (bookmark) => bookmark.post.id === Post.id
  )?.bookmarkId;

  const isliked = Post.likes?.some((id) => id === user.id);

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
            alt={Post.user.username}
          />
        </div>
        <div className="username-and-more-option flex-center flex-direction-column">
          <div className="username-and-icon flex-center">
            <p className="username-from-posts">{Post.user.username}</p>
            <span className="more-options">
              {user.username === Post.user.username ? (
                <FaTrash
                  className="more-option-icon"
                  title="Delete"
                  onClick={() => {
                    if (isEditing) {
                      toast("you can't delete post while editing", {
                        icon: "✔",
                      });
                    }
                    dispatch(deletePost({ postId: Post.id, bookmarkId }));
                  }}
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
              {Post.imgUrl === undefined || Post.imgUrl === "" ? null : (
                <div className="image-conatiner">
                  <img
                    className="image-of-post"
                    src={Post.imgUrl ? Post.imgUrl : null}
                  />
                </div>
              )}
            </div>
          </div>
          {Post.likes.length === 0 ? (
            ""
          ) : (
            <div className="userspost-likeCount flex-center">
              <span> {Post?.likes?.length} Likes</span>
            </div>
          )}
          <div className="user-post-icons-container flex-center">
            <span className="background-of-icon flex-center">
              {isliked ? (
                <FaHeart
                  className="action-icons color-red"
                  title="disLike"
                  onClick={() => dispatch(disLikedPost(Post.id))}
                />
              ) : (
                <FaRegHeart
                  className="action-icons"
                  title="Like"
                  onClick={() => dispatch(LikedPost(Post.id))}
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
            {/* TO DO FOR FUTURE */}
            <span className="background-of-icon flex-center">
              <FiShare2 className="action-icons" title="Share" />
            </span>
            {/* WILL IMPLEMENT SHARE FUNCTIONALITY */}
            {user.username === Post.user.username && pathname === "/home" && (
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
            <span className="background-of-icon flex-center">
              {bookmarkId ? (
                <FaBookmark
                  className="action-icons"
                  title="remove fromBookMark"
                  onClick={() =>
                    dispatch(
                      deletePostFromBookmark({ bookmarkId, id: Post.id })
                    )
                  }
                />
              ) : (
                <FaRegBookmark
                  className="action-icons"
                  title="BookMark"
                  onClick={() => dispatch(addToBookmark(Post))}
                />
              )}
            </span>
          </div>
        </div>
        <hr />
      </div>
      {isShow && <CommentSection PostId={Post.id} Post={Post} />}
      <div className="loader homepage">
        {likedPostStatus === "loading" && <Loader />}
        {dislikedPostStatus === "loading" && <Loader />}
        {deletebookmarkStatus === "loading" && <Loader />}
        {status === "loading" && <Loader />}
        {addCommentStatus === "loading" && <Loader />}
      </div>
    </div>
  );
};
