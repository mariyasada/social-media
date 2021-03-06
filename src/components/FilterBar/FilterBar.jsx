import React from "react";
import "../FilterBar/FilterBar.css";

const FilterConstants = ["Oldest", "Recent", "Trending"];
export const FilterBar = ({ filterDispatch, state }) => {
  return (
    <div className="filter-item-container border-round">
      <ul className="filter-items flex-center">
        {FilterConstants.map((item, index) => {
          return (
            <li
              className={`filter-item selected ${
                state.sortByDate === item && "filter-link-active"
              }`}
              key={index}
              onClick={() =>
                filterDispatch({ type: "SORT_BY_DATE", payload: item })
              }
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
