import { useState } from "react";
import { Modal, UsersPost } from "../../components";
import { useAuth, usePosts } from "../../contexts";
import "../userProfile/userprofile.css";

export const UserProfile = () => {
  const {
    user: { userData },
  } = useAuth();

  const {
    state: { postsList },
  } = usePosts();
  const loggedUsersPost = postsList.filter(
    (item) => item.username === userData.username
  );
  const [isShow, setShow] = useState(false);
  return (
    <div className="profile-of-user-container flex-center flex-direction-column">
      <div className="username-with-avatar-container flex-center flex-direction-column border-round">
        <div className="avatar-container">
          <img
            className="avatar avatar-md"
            src={
              userData.profile
                ? userData.profile
                : "https://iqra-ui.netlify.app/images/blank.png"
            }
            alt="user-profile"
          />
        </div>
        <h2 className="username color-black">{userData.username}</h2>
        <div className="edit-btn-container">
          <button
            className="btn btn-edit border-round"
            onClick={() => setShow(true)}
          >
            Edit Profile
          </button>
        </div>
        <div className="details-container flex-center flex-direction-column">
          <p className="details">{userData.bio}</p>
          <span className="portfolio-url">{userData.website}</span>
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
        {loggedUsersPost.map((userpost) => {
          return <UsersPost Post={userpost} key={userpost._id} />;
        })}
      </div>
      {isShow && <Modal setShow={setShow} />}
    </div>
  );
};
