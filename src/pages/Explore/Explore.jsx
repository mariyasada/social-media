import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { UserList, UsersPost } from "../../components";
import "../Explore/Explore.css";

export const Explore = () => {
  const { Posts } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);
  const Listofposts = Posts.filter(
    (item) => item.user.username !== user.username
  );
  console.log(Listofposts, "list hai bhai");
  return (
    <div className="explore-page-container flex-center">
      <div className="userallpost-container flex-center flex-direction-column">
        {Listofposts.map((userpost) => {
          return <UsersPost Post={userpost} key={userpost.id} />;
        })}
      </div>
      <div className="list-of-users-container">
        <UserList />
      </div>
    </div>
  );
};
