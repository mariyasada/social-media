import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Modal, UsersPost, Loader } from "../../components";
import {
  followUser,
  getUserProfileData,
  unfollowUser,
} from "../../redux/auth/authslice";
import "../userProfile/userprofile.css";

export const UserProfile = () => {
  const { Posts } = useSelector((state) => state.post);
  const { user, userProfileData, updateDataStatus, getUserProfileStatus } =
    useSelector((state) => state.auth);
  const [isShow, setShow] = useState(false);
  const dispatch = useDispatch();

  const { currentUserId } = useParams();

  const loggedInUserPost = Posts.filter(
    (post) => post.user.username === user.username
  );

  const userPosts = Posts.filter((post) => post.user.id === currentUserId);

  useEffect(async () => {
    dispatch(getUserProfileData(currentUserId));
  }, [dispatch, currentUserId]);

  const currentUserProfile = currentUserId === user.id ? user : userProfileData;
  const isFollowing = userProfileData?.followers?.includes(user.id);

  return (
    <div className="profile-of-user-container flex-center flex-direction-column">
      <div className="username-with-avatar-container flex-center flex-direction-column border-round">
        <div className="avatar-container">
          <img
            className="avatar avatar-md"
            src={
              currentUserProfile?.photoURL
                ? currentUserProfile?.photoURL
                : "https://iqra-ui.netlify.app/images/blank.png"
            }
            alt={currentUserProfile?.username}
          />
        </div>
        <h2 className="username color-black">{currentUserProfile.username}</h2>
        <div className="edit-btn-container">
          {currentUserId === user.id ? (
            <button
              className="btn btn-edit border-round"
              onClick={() => setShow(true)}
            >
              Edit Profile
            </button>
          ) : (
            <button className="btn btn-edit border-round">
              {isFollowing ? "Following" : "Follow"}
            </button>
          )}
        </div>
        <div className="details-container flex-center flex-direction-column">
          <p className="details">{currentUserProfile?.bio}</p>
          <span className="portfolio-url">
            {currentUserProfile?.portfolioLink}
          </span>
        </div>
        <div className="followers-container flex-center border-round">
          <span className="follower flex-center flex-direction-column">
            <p className="count">{currentUserProfile?.following?.length}</p>
            <p className="follower-detail">Following</p>
          </span>
          <span className="follower flex-center flex-direction-column">
            <p className="count">{currentUserProfile?.followers?.length}</p>
            <p className="follower-detail">Followers</p>
          </span>
          <span className="follower flex-center flex-direction-column">
            <p className="count">
              {currentUserId === user.id
                ? loggedInUserPost?.length
                : userPosts?.length}
            </p>
            <p className="follower-detail">Posts</p>
          </span>
        </div>
      </div>
      <div className="user-post-container flex-center flex-direction-column">
        {currentUserId === user.id
          ? loggedInUserPost.map((post) => {
              return <UsersPost Post={post} key={post.id} />;
            })
          : userPosts.map((post) => {
              return <UsersPost Post={post} key={post.id} />;
            })}
      </div>

      {isShow && <Modal setShow={setShow} user={user} />}
      <div className="loader homepage">
        {updateDataStatus === "loading" ||
          (getUserProfileStatus === "loading" && <Loader />)}
      </div>
    </div>
  );
};
