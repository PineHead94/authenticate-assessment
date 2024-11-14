import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MovieCard } from "../MovieCard/MovieCard";
import "./SavedList.css";

const SavedList = () => {
  const location = useLocation();
  const [listName, setListName] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    const currrentUser = localStorage.getItem("currentUser");
    const currentList = JSON.parse(currrentUser)?.data?.[location.state];
    setListName(currentList?.listName);
    setList(currentList?.movies);
  }, [location.pathname]);

  return (
    <div className="saved-list-main-container">
      {listName && (
        <div className="saved-list-wrapper">
          <div className="saved-list-wrapper">
            <p className="header-3 saved-list-header">Movies By "{listName}"</p>
            <p className="header-3 saved-list-description">
              About this watchlist
            </p>
            <p className="header-text saved-list-description">
              Lorem ipsum dolor sit amet consectetur adipisicing.
            </p>
          </div>
          <div className="saved-list-card-container">
            {list?.map((element, index) => {
              return (
                <MovieCard
                  removeBookmark={true}
                  key={index}
                  name={element.Title}
                  poster={element.Poster}
                  year={element.Year}
                  onClick={() => {}}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export { SavedList };
