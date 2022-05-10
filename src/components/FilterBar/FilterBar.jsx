import React from "react";
import "../FilterBar/FilterBar.css";

export const FilterBar = () => {
  return (
    <div className="filter-item-container border-round">
      <ul className="filter-items flex-center">
        <li className="filter-item">Oldest</li>
        <li className="filter-item">Trending</li>
        <li className="filter-item">Recent</li>
      </ul>
    </div>
  );
};
