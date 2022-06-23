import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getUsers, followUser, unfollowUser } from "../../redux/auth/authslice";
import "../ListOfuser/userlist.css";
import { BsSearch } from "../icons";
import { getsortedUsers } from "../../utils/utils";

export const UserList = ({ filterDispatch, state }) => {
  const dispatch = useDispatch();
  const { users, user } = useSelector((state) => state.auth);
  const { pathname } = useLocation();
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

  const listOfuser = pathname === "/explore" && getsortedUsers(users, state);

  return (
    <div className="userlist-container flex-center flex-direction-column border-round">
      {pathname === "/explore" && (
        <div className="search-input-container flex-center">
          <BsSearch className="search-icon" />
          <input
            type="text"
            className="input-search"
            placeholder="Search"
            onChange={(e) =>
              filterDispatch({
                type: "SEARCH_BY_QUERY",
                payload: e.target.value,
              })
            }
          />
        </div>
      )}

      <div className="title-and-option-container flex-center">
        <p className="who-to-follow">Suggestions for you</p>
      </div>

      {pathname === "/explore"
        ? listOfuser.map((followeruser) => {
            return (
              <div
                className="user-with-avatar-container flex-center"
                key={followeruser.id}
              >
                <div className="image-with-username flex-center">
                  <Link to={`/profile/${followeruser.id}`}>
                    <img
                      src={
                        followeruser.photoURL
                          ? followeruser.photoURL
                          : "./assets/avatar.png"
                      }
                      alt="user-profile"
                      className="avatar avatar-xsm"
                    />
                  </Link>
                  <p className="username-from-userlist">
                    {followeruser.username}
                  </p>
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
          })
        : users.map((followeruser) => {
            return (
              <div
                className="user-with-avatar-container flex-center"
                key={followeruser.id}
              >
                <div className="image-with-username flex-center">
                  <Link to={`/profile/${followeruser.id}`}>
                    <img
                      src={
                        followeruser.photoURL
                          ? followeruser.photoURL
                          : "./assets/avatar.png"
                      }
                      alt="user-profile"
                      className="avatar avatar-xsm"
                    />
                  </Link>
                  <p className="username-from-userlist">
                    {followeruser.username}
                  </p>
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
