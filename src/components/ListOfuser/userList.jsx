import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, followUser, unfollowUser } from "../../redux/auth/authslice";
import "../ListOfuser/userlist.css";

export const UserList = () => {
  const dispatch = useDispatch();
  const { users, user } = useSelector((state) => state.auth);
  // const isAnyFollower = users.map((user) =>
  //   user.followers.some((id) => user.id)
  // );

  // console.log(users, "multipleusers");
  useEffect(() => {
    try {
      if (user) {
        dispatch(getUsers());
      } else {
        console.log("could not complete the request");
      }
    } catch (err) {
      console.log(err, "could not complete the request");
    }
  }, [dispatch, user]);

  return (
    <div className="userlist-container flex-center flex-direction-column border-round">
      <div className="title-and-option-container flex-center">
        <p className="who-to-follow">Who to Follow?</p>
        <p className="show-more">Show More</p>
      </div>
      {users.map((followeruser) => {
        return (
          <div
            className="user-with-avatar-container flex-center"
            key={followeruser.id}
          >
            <div className="image-with-username flex-center">
              <img
                src={
                  followeruser.photoURL
                    ? followeruser.photoURL
                    : "./assets/avatar.png"
                }
                alt="user-profile"
                className="avatar avatar-xsm"
              />
              <p className="username-from-userlist">{followeruser.username}</p>
            </div>
            <span className="follow-btn-container">
              {user.following?.some((id) => id === followeruser.id) ? (
                <button
                  className="btn btn-follow border-round"
                  onClick={() => dispatch(unfollowUser(followeruser.id))}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  className="btn btn-follow border-round"
                  onClick={() => dispatch(followUser(followeruser.id))}
                >
                  Follow
                </button>
              )}
            </span>
          </div>
        );
      })}
    </div>
  );
};
