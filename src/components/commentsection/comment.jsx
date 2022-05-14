import React, { useState } from "react";
import { IoSend } from "../icons";

export const CommentSection = () => {
  const [isVisible, setVisible] = useState(false);
  return (
    <div className="comment-section-container flex-center flex-direction-column">
      <div className="avatar-and-input-container flex-center">
        <div className="avatar-container">
          <img
            className="avatar avatar-xsm"
            src="https://iqra-ui.netlify.app/images/blank.png"
            alt="user profile"
          />
        </div>
        <div className="input-and-sendbtn-container flex-center border-round">
          <input
            type="text"
            placeholder="write a comment..."
            className="input-for-comment"
          />
          <IoSend className="action-icons" title="send" />
        </div>
      </div>
      <div className="comment-rendered-section flex-center flex-direction-column">
        <div className="username-avatar-container flex-center">
          <div className="avatar-container-from-comment">
            <img
              className="avatar avatar-xsm"
              src="https://iqra-ui.netlify.app/images/blank.png"
              alt="user profile"
            />
          </div>
          <div className="username-and-comment flex-center flex-direction-column">
            <p className="username">Mariyasada</p>
            <p className="comment-of-user">hello how are you</p>
            <p className="reply-link" onClick={() => setVisible(!isVisible)}>
              Reply
            </p>
            {/*  reply comments  */}
            <div className="username-avatar-container flex-center">
              <div className="avatar-container-from-comment">
                <img
                  className="avatar avatar-xsm"
                  src="https://iqra-ui.netlify.app/images/blank.png"
                  alt="user profile"
                />
              </div>
              <div className="username-and-comment flex-center flex-direction-column">
                <p className="username">Mariyasada</p>
                <p className="comment-of-user">hello how are you</p>
              </div>
            </div>
            {/*  reply comments over here */}
            {isVisible && (
              <div className="avatar-and-input-container-for-reply flex-center">
                <div className="avatar-container">
                  <img
                    className="avatar avatar-xsm"
                    src="https://iqra-ui.netlify.app/images/blank.png"
                    alt="user profile"
                  />
                </div>
                <div className="input-and-sendbtn-container flex-center border-round">
                  <input
                    type="text"
                    placeholder="Reply to Mariya..."
                    className="input-for-comment"
                  />
                  <IoSend className="action-icons" title="send" />
                </div>
              </div>
            )}
          </div>
        </div>
        {/* another comment */}
        <div className="username-avatar-container flex-center">
          <div className="avatar-container-from-comment">
            <img
              className="avatar avatar-xsm"
              src="https://iqra-ui.netlify.app/images/blank.png"
              alt="user profile"
            />
          </div>
          <div className="username-and-comment flex-center flex-direction-column">
            <p className="username">Mariyasada</p>
            <p className="comment-of-user">hello how are you</p>
            <p className="reply-link">Reply</p>
          </div>
        </div>
      </div>
    </div>
  );
};
