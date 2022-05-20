import { useState } from "react";
import { useSelector } from "react-redux";
import { Modal, UsersPost } from "../../components";
import "../userProfile/userprofile.css";

export const UserProfile = () => {
  const { Posts } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);
  const [isShow, setShow] = useState(false);

  const loggedInUserPost = Posts.filter(
    (post) => post.user.username === user.username
  );
  return (
    <div className="profile-of-user-container flex-center flex-direction-column">
      <div className="username-with-avatar-container flex-center flex-direction-column border-round">
        <div className="avatar-container">
          <img
            className="avatar avatar-md"
            src={
              user.photoURL
                ? user.photoURL
                : "https://iqra-ui.netlify.app/images/blank.png"
            }
            alt="user-profile"
          />
        </div>
        <h2 className="username color-black">{user.username}</h2>
        <div className="edit-btn-container">
          <button
            className="btn btn-edit border-round"
            onClick={() => setShow(true)}
          >
            Edit Profile
          </button>
        </div>
        <div className="details-container flex-center flex-direction-column">
          <p className="details"></p>
          <span className="portfolio-url"></span>
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
        {loggedInUserPost.map((post) => {
          return <UsersPost Post={post} key={post.id} />;
        })}
      </div>
      {isShow && <Modal setShow={setShow} />}
    </div>
  );
};
