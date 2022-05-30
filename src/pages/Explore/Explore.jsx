import React from "react";
import { useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FilterBar, UserList, UsersPost } from "../../components";
import "../Explore/Explore.css";
import "../userHome/Home.css";
import { filterPostReducer } from "./filterPostReducer";
import { getFilteredPost } from "../../utils/utils";

export const Explore = () => {
  const { Posts } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);
  const Listofposts = Posts.filter(
    (item) => item.user.username !== user.username
  );

  const [state, dispatch] = useReducer(filterPostReducer, {
    sortByDate: "Recent",
  });

  const sortestPost = getFilteredPost(Listofposts, state);
  return (
    <div className="explore-page-container flex-center">
      <div className="home-feed-container flex-center flex-direction-column">
        <FilterBar dispatch={dispatch} state={state} />
        <div className="userallpost-container flex-center flex-direction-column">
          {sortestPost
            .map((userpost) => {
              return <UsersPost Post={userpost} key={userpost.id} />;
            })
            .reverse()}
        </div>
      </div>
      <div className="list-of-users-container">
        <UserList />
      </div>
    </div>
  );
};
