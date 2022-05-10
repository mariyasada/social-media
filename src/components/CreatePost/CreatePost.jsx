import React from "react";
import { GrImage, AiOutlineFileGif, BsEmojiSmile } from "../icons";
import "../CreatePost/createpost.css";

export const CreatePost = () => {
  return (
    <div className="create-post-container flex-center border-round">
      <div className="avatar-image-container">
        <img
          className="avatar avatar-xsm"
          src="https://picsum.photos/200"
          alt="user profile"
        />
      </div>
      <div className="textarea-with-icon-container flex-center flex-direction-column">
        <textarea
          cols="50"
          className="textarea-of-createPost"
          placeholder="Write something interesting... "
        />
        <div className="icons-and-post-btn-container flex-center">
          <div className="icons-container flex-center">
            <GrImage className="icons" />
            <AiOutlineFileGif className="icons" />
            <BsEmojiSmile className="icons" />
          </div>
          <span className="btn-container">
            <button className="btn btn-of-post border-round">Post</button>
          </span>
        </div>
      </div>
    </div>
  );
};
