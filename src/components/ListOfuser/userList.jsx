import React from "react";
import { usePosts } from "../../contexts";
import "../ListOfuser/userlist.css";

export const UserList = () => {
  const { state } = usePosts();
  const { userList } = state;

  return (
    <div className="userlist-container flex-center flex-direction-column border-round">
      <div className="title-and-option-container flex-center">
        <p className="who-to-follow">Who to Follow?</p>
        <p className="show-more">Show More</p>
      </div>
      {userList.map((user) => {
        return (
          <div
            className="user-with-avatar-container flex-center"
            key={user._id}
          >
            <div className="image-with-username flex-center">
              <img
                src={user.profile}
                alt="user-profile"
                className="avatar avatar-xsm"
              />
              <p className="username-from-userlist">{user.username}</p>
            </div>
            <span className="follow-btn-container">
              <button className="btn btn-follow border-round">Follow</button>
            </span>
          </div>
        );
      })}
      {/* <div className="user-with-avatar-container flex-center">
        <div className="image-with-username flex-center">
          <img
            src="https://picsum.photos/200"
            alt="user-profile"
            className="avatar avatar-xsm"
          />
          <p className="username-from-userlist">MariyaSada</p>
        </div>
        <span className="follow-btn-container">
          <button className="btn btn-follow border-round">Follow</button>
        </span>
      </div>

      <div className="user-with-avatar-container flex-center">
        <div className="image-with-username flex-center">
          <img
            src="https://picsum.photos/200"
            alt="user-profile"
            className="avatar avatar-xsm"
          />
          <p className="username-from-userlist">MariyaSada</p>
        </div>
        <span className="follow-btn-container">
          <button className="btn btn-follow border-round">Follow</button>
        </span>
      </div>
      <div className="user-with-avatar-container flex-center">
        <div className="image-with-username flex-center">
          <img
            src="https://picsum.photos/200"
            alt="user-profile"
            className="avatar avatar-xsm"
          />
          <p className="username-from-userlist">MariyaSada</p>
        </div>
        <span className="follow-btn-container">
          <button className="btn btn-follow border-round">Follow</button>
        </span>
      </div>*/}
    </div>
  );
};
