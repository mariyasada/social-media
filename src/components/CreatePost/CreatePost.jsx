import React, { useState } from "react";
import { GrImage, AiOutlineFileGif, BsEmojiSmile } from "../icons";
import "../CreatePost/createpost.css";
import { useAuth, usePosts } from "../../contexts";
import toast from "react-hot-toast";

export const CreatePost = () => {
  const {
    user: { userData },
  } = useAuth();
  const {
    postData,
    setPostData,
    createPostHandler,
    editPostHandler,
    isEditing,
    setIsEditing,
  } = usePosts();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setPostData((prevData) => ({ ...prevData, [name]: value }));
  };
  const createPostclickHandler = () => {
    if (postData === "") {
      toast("please fill the form field");
    } else if (postData && isEditing) {
      editPostHandler(postData);
      setIsEditing(!isEditing);
      toast("suceessfully post updated", { icon: "✔" });
    } else {
      createPostHandler(postData);
    }
    setPostData({ content: " " });
  };

  return (
    <div className="create-post-container flex-center border-round">
      <div className="avatar-image-container">
        <img
          className="avatar avatar-xsm"
          src={
            userData.profile
              ? userData.profile
              : "https://iqra-ui.netlify.app/images/blank.png"
          }
          alt="user profile"
        />
      </div>
      <div className="textarea-with-icon-container flex-center flex-direction-column">
        <textarea
          cols="50"
          className="textarea-of-createPost"
          placeholder="Write something interesting... "
          required
          name="content"
          id="content"
          value={postData.content}
          onChange={(e) => changeHandler(e)}
        />
        <div className="icons-and-post-btn-container flex-center">
          <div className="icons-container flex-center">
            <label className="label-for-icons flex-center">
              <input
                type="file"
                accept="image/png, image/jpg, image/gif, image/jpeg"
                className="input-for-image"
              />
              <GrImage className="icons" />
              <AiOutlineFileGif className="icons" />
              <BsEmojiSmile className="icons" />
            </label>
          </div>
          <span className="btn-container">
            <button
              className="btn btn-of-post border-round"
              onClick={createPostclickHandler}
            >
              {isEditing ? "Update Post" : "Post"}
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};
