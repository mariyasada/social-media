import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Modal, UsersPost, Loader } from "../../components";
import {
  followUser,
  getUserProfileData,
  unfollowUser,
  setLoader,
} from "../../redux/auth/authslice";
import { FetchComments, getPosts } from "../../redux/post/postSlice";
import "../userProfile/userprofile.css";

export const UserProfile = () => {
  const { Posts, getPostStatus } = useSelector((state) => state.post);
  const { user, userProfileData, updateDataStatus, getUserProfileStatus } =
    useSelector((state) => state.auth);
  const [isShow, setShow] = useState(false);
  const dispatch = useDispatch();

  const { currentUserId } = useParams();

  const loggedInUserPost = Posts.filter(
    (post) => post.user.username === user.username
  );
  const sortLoggedInUserPost = loggedInUserPost.sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

  const userPosts = Posts.filter((post) => post.user.id === currentUserId);
  const sortUserPosts = userPosts.sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

  useEffect(async () => {
    dispatch(getUserProfileData(currentUserId));
    dispatch(getPosts());
    dispatch(FetchComments());
  }, [dispatch, currentUserId]);

  const currentUserProfile = currentUserId === user.id ? user : userProfileData;
  const isFollowing = userProfileData?.followers?.includes(user.id);

  let ishrefIncluded = currentUserProfile?.portfolioLink?.includes("https://");

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
            <a
              href={
                ishrefIncluded
                  ? `${currentUserProfile?.portfolioLink}`
                  : `https://${currentUserProfile?.portfolioLink}`
              }
              target="_blank"
            >
              {currentUserProfile?.portfolioLink}
            </a>
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
          ? sortLoggedInUserPost.map((post) => {
              return <UsersPost Post={post} key={post.id} />;
            })
          : sortUserPosts.map((post) => {
              return <UsersPost Post={post} key={post.id} />;
            })}
      </div>

      {isShow && <Modal setShow={setShow} user={user} />}
      <div className="loader homepage">
        {updateDataStatus === "loading" && <Loader />}
        {getUserProfileStatus === "loading" && <Loader />}
        {getPostStatus === "loading" && <Loader />}
      </div>
    </div>
  );
};
