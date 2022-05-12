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
} from "../icons";

export const UsersPost = () => {
  const [isShow, setShow] = useState(false);
  const [isVisible, setVisible] = useState(false);
  return (
    <div className="user-post-comment-container flex-center flex-direction-column border-round">
      <div className="user-post flex-center border-round">
        <div className="profilepic-container">
          <img
            className="avatar avatar-xsm"
            src="https://picsum.photos/200"
            alt="user profile"
          />
        </div>
        <div className="username-and-more-option flex-center flex-direction-column">
          <div className="username-and-icon flex-center">
            <p className="username-from-posts">MariyaSada</p>
            <span className="more-options">
              <FaTrash className="more-option-icon" title="Delete" />
            </span>
          </div>
          <div className="users-post-details-container">
            <div className="details">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Inventore, illum culpa quod perferendis neque maxime harum
                deleniti quaerat labore voluptates. Aut sit molestias a
                excepturi minus praesentium, adipisci dolorem distinctio.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Inventore, illum culpa quod perferendis neque maxime harum
                deleniti quaerat labore voluptates. Aut sit molestias a
                excepturi minus praesentium, adipisci dolorem distinctio. Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Inventore,
                illum culpa quod perferendis neque maxime harum deleniti quaerat
                labore voluptates. Aut sit molestias a excepturi minus
                praesentium, adipisci dolorem distinctio.
              </p>
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
              <FaEdit className="action-icons" title="Edit" />
            </span>
          </div>
        </div>
        <hr />
      </div>
      {isShow && (
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
                <p
                  className="reply-link"
                  onClick={() => setVisible(!isVisible)}
                >
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
      )}
    </div>
  );
};
