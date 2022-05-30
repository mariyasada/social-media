import React, { useState } from "react";
import { GrImage, AiOutlineFileGif, BsEmojiSmile } from "../icons";
import "../CreatePost/createpost.css";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addPosts, editPost } from "../../redux/post/postSlice";
import Picker from "emoji-picker-react-2";
import { Link } from "react-router-dom";
import { Loader } from "../Loader/Loader";

export const CreatePost = ({
  postData,
  setPostData,
  isEditing,
  setIsEditing,
}) => {
  const [showEmoji, setShowEmoji] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { firstName, lastName, username, photoURL, id } = user;
  const { editPostStatus } = useSelector((state) => state.post);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setPostData((prevData) => ({ ...prevData, [name]: value }));
  };
  const createPostclickHandler = () => {
    if (postData.content === "") {
      toast("please fill the form field", { icon: "✔" });
    } else if (postData && isEditing) {
      dispatch(editPost(postData));
      setIsEditing(!isEditing);
    } else {
      dispatch(
        addPosts({
          ...postData,
          createdAt: Date.now(),
          userId: id,
        })
      );
    }
    setPostData({ content: " " });
  };

  const cancelupdatePostHandler = () => {
    setIsEditing(false);
    setPostData({ content: " " });
  };
  const onEmojiClick = (e, emojiObject) => {
    e.preventDefault();
    setPostData((prevData) => ({
      ...prevData,
      content: postData.content + emojiObject.emoji,
    }));
    setShowEmoji(false);
  };

  return (
    <div className="create-post-container flex-center border-round">
      <div className="avatar-image-container">
        <Link to={`/profile/${user.id}`}>
          <img
            className="avatar avatar-xsm"
            src={user.photoURL ? user.photoURL : "https://picsum.photos/200"}
            alt="user profile"
          />
        </Link>
      </div>
      <div className="textarea-with-icon-container flex-center flex-direction-column">
        <textarea
          cols="50"
          className="textarea-of-createPost"
          placeholder="Write something interesting... "
          name="content"
          id="content"
          value={postData.content}
          onChange={(e) => changeHandler(e)}
          required
        />
        <div className="icons-and-post-btn-container flex-center">
          <div className="icons-container flex-center">
            <label className="label-for-icons flex-center">
              <GrImage className="icons" />
              <AiOutlineFileGif className="icons" />
              <BsEmojiSmile
                className="icons"
                onClick={() => setShowEmoji((showEmoji) => !showEmoji)}
              />
            </label>
          </div>

          <span className="btn-container flex-center">
            {isEditing && (
              <button
                className="btn btn-of-post border-round"
                onClick={cancelupdatePostHandler}
              >
                Cancel
              </button>
            )}
            <button
              className="btn btn-of-post border-round"
              onClick={createPostclickHandler}
            >
              {isEditing ? "Update Post" : "Post"}
            </button>
          </span>
        </div>
      </div>

      {showEmoji && (
        <div className="emojicontainer">
          <Picker onEmojiClick={onEmojiClick} className="picker-emoji" />
        </div>
      )}
      <div className="loader homepage">
        {editPostStatus === "loading" && <Loader />}
      </div>
    </div>
  );
};
