import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoSend, FaTrash, FiSend } from "../icons";
import { addCommentsToPost, deleteComment } from "../../redux/post/postSlice";
import toast from "react-hot-toast";
import { Loader } from "../Loader/Loader";

export const CommentSection = ({ PostId, Post }) => {
  const { comments, addCommentStatus } = useSelector((state) => state.post);

  const commetsToShow = comments.filter((comment) => comment.PostId === PostId);
  const [isVisible, setVisible] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [comment, setComment] = useState({ description: "" });
  const dispatch = useDispatch();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setComment((prevData) => ({ ...prevData, [name]: value }));
  };

  const commentHandler = () => {
    if (comment === "") {
      toast("cannot add blank comment", { icon: "✔" });
    } else {
      dispatch(addCommentsToPost({ PostId, comment }));
      toast("successfully comment added", { icon: "✔" });
    }
    setComment({ description: " " });
  };
  return (
    <div className="comment-section-container flex-center flex-direction-column">
      <div className="avatar-and-input-container flex-center">
        <div className="avatar-container">
          <img
            className="avatar avatar-xsm"
            src={user.photoURL ? user.photoURL : "https://picsum.photos/200"}
            alt="user profile"
          />
        </div>
        <div className="input-and-sendbtn-container flex-center border-round">
          <input
            type="text"
            placeholder="write a comment..."
            className="input-for-comment"
            name="description"
            value={comment.description}
            onChange={(e) => onChangeHandler(e)}
          />
          <IoSend
            className="action-icons"
            title="send"
            onClick={commentHandler}
          />
        </div>
      </div>

      {commetsToShow.length === 0 ? (
        <div className="comment-section flex-center">
          <p className="color-teal">Be a first one to post a comment</p>
        </div>
      ) : (
        commetsToShow.map((postComment) => {
          return (
            <div
              className="comment-rendered-section flex-center flex-direction-column"
              key={postComment.id}
            >
              <div className="username-avatar-container flex-center">
                <div className="avatar-container-from-comment">
                  <img
                    className="avatar avatar-xsm"
                    src={
                      postComment.userData.photoURL
                        ? postComment.userData.photoURL
                        : "https://picsum.photos/200"
                    }
                    alt="user profile"
                  />
                </div>
                <div className="username-and-comment flex-center ">
                  <div className="comment-container flex-center flex-direction-column">
                    <p className="username">{postComment.userData.username}</p>
                    <p className="comment-of-user">
                      {postComment.comment.description}
                    </p>
                  </div>
                  {user.username === postComment.userData.username && (
                    <FaTrash
                      className="reply-link"
                      onClick={() => {
                        dispatch(deleteComment(postComment.id)),
                          toast("successfully comment deleted", { icon: "✔" });
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })
      )}
      <div className="loader homepage">
        {addCommentStatus === "loading" && <Loader />}
      </div>
    </div>
  );
};
