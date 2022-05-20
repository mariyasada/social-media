import React from "react";
import { UserList, UsersPost } from "../../components";
import { useAuth, usePosts } from "../../contexts";
import "../Explore/Explore.css";

export const Explore = () => {
  const {
    user: { userData },
  } = useAuth();
  const {
    state: { postsList },
  } = usePosts();
  const Listofposts = postsList.filter(
    (item) => item.username !== userData.username
  );
  return (
    <div className="explore-page-container flex-center">
      <div className="userallpost-container flex-center flex-direction-column">
        {/* {Listofposts.map((userpost) => {
          return <UsersPost Post={userpost} key={userpost._id} />;
        })} */}
        <UsersPost />
        <UsersPost />
        <UsersPost />
        <UsersPost />
      </div>
      <div className="list-of-users-container">
        <UserList />
      </div>
    </div>
  );
};
