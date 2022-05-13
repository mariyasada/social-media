import { useState } from "react";
import { Modal, UsersPost } from "../../components";
import "../userProfile/userprofile.css";

export const UserProfile = () => {
  const [isShow, setShow] = useState(false);
  return (
    <div className="profile-of-user-container flex-center flex-direction-column">
      <div className="username-with-avatar-container flex-center flex-direction-column border-round">
        <div className="avatar-container">
          <img
            className="avatar avatar-md"
            src="https://picsum.photos/200"
            alt="user-profile"
          />
        </div>
        <h2 className="username color-black">MariyaSada</h2>
        <div className="edit-btn-container">
          <button
            className="btn btn-edit border-round"
            onClick={() => setShow(true)}
          >
            Edit Profile
          </button>
        </div>
        <div className="details-container flex-center flex-direction-column">
          <p className="details">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil
            illum neque ex accusantium! Perferendis excepturi laudantium nulla
            officiis. Consequuntur pariatur aliquid nisi doloremque ipsa,
            explicabo id ex assumenda! Molestias, cumque!
          </p>
          <span className="portfolio-url">mariyasada.netlify.app</span>
        </div>
        <div className="followers-container flex-center border-round">
          <span className="follower flex-center flex-direction-column">
            <p className="count">0</p>
            <p className="follower-detail">Following</p>
          </span>
          <span className="follower flex-center flex-direction-column">
            <p className="count">0</p>
            <p className="follower-detail">Followers</p>
          </span>
        </div>
      </div>
      <div className="user-post-container flex-center flex-direction-column">
        <UsersPost />
        <UsersPost />
      </div>
      {isShow && <Modal setShow={setShow} />}
    </div>
  );
};
