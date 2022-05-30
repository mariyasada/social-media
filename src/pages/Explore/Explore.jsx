import React, { useReducer, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FilterBar, UserList, UsersPost, Loader } from "../../components";
import "../Explore/Explore.css";
import "../userHome/Home.css";
import { filterPostReducer } from "./filterPostReducer";
import { getFilteredPost } from "../../utils/utils";
import { FetchComments, getPosts } from "../../redux/post/postSlice";
import { getBookmarks } from "../../redux/bookmark/bookmarkSlice";

export const Explore = () => {
  const dispatch = useDispatch();

  useEffect(async () => {
    try {
      dispatch(getPosts());
      dispatch(getBookmarks());
      dispatch(FetchComments());
    } catch (err) {
      console.log(err, "could not complete the request");
    }
  }, [dispatch]);

  const { Posts, getPostStatus } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);
  const Listofposts = Posts.filter(
    (item) => item.user.username !== user.username
  );

  const [state, filterDispatch] = useReducer(filterPostReducer, {
    sortByDate: "Recent",
    searchByQuery: "",
  });

  const sortestPost = getFilteredPost(Listofposts, state);

  return (
    <div className="explore-page-container flex-center">
      <div className="home-feed-container flex-center flex-direction-column">
        <FilterBar filterDispatch={filterDispatch} state={state} />
        <div className="userallpost-container flex-center flex-direction-column">
          {sortestPost
            .map((userpost) => {
              return <UsersPost Post={userpost} key={userpost.id} />;
            })
            .reverse()}
        </div>
      </div>
      <div className="list-of-users-container">
        <UserList filterDispatch={filterDispatch} state={state} />
      </div>
      <div className="loader homepage">
        {getPostStatus === "loading" && <Loader />}
      </div>
    </div>
  );
};
