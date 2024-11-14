import React, { useState } from "react";
import { SearchInput } from "../../layouts/SearchInput/SearchInput";
import { useDispatch } from "react-redux";
import { getMovies, moviesSlice } from "../../../slice/moviesSlice";
import { saveMovie } from "../../../slice/userSlice";
import { MovieCard } from "../../layouts/MovieCard/MovieCard";
import { useSelector } from "react-redux";
import save from "../../../../assets/bookmark.png";
import "./WatchList.css";
import { ErrorModal } from "../../layouts/ErrorModal/ErrorModal";

const WatchLists = () => {
  const dispatch = useDispatch();
  const { list, searchQuery, error } = useSelector((state) => state.movies);
  const { closeError } = moviesSlice.actions;
  const [search, setSearch] = useState(list?.length === 0 ? "" : searchQuery);

  return (
    <div className="watch-lists-main-container">
      <ErrorModal
        message="No movies found!!"
        open={error}
        onClick={() => dispatch(closeError())}
      />
      <div className="welcome-container">
        <div className="welcome-header-top">
          <p className="header-3 welcome-header">Welcome to</p>
          <p className="header-3 welcome-header-2">Watchlists</p>
        </div>
        <div>
          <p className="header-3 welcome-header-text">
            Browse movies, add them to watchlists and share them to friends.
          </p>
          <div className="welcome-header-sub-text">
            <p className="header-3 welcome-header-text">Just click</p>
            <img src={save} alt="save" className="header-save-image" />
            <p className="header-3 welcome-header-text">to add</p>
            &nbsp;
            <p className="header-3 welcome-header-text">a movie,</p>
            &nbsp;
            <p className="header-3 welcome-header-text">click the</p>
            &nbsp;
            <p className="header-3 welcome-header-text">poster to</p>
            &nbsp;
            <p className="header-3 welcome-header-text">see more details.</p>
          </div>
        </div>
      </div>
      <form>
        <div className="search-input-main-container">
          <SearchInput value={search} onChange={setSearch} />
          <button
            onClick={(e) => {
              e.preventDefault();
              dispatch(getMovies(search));
            }}
            className="search-input-button"
          >
            <p className="header-text">Search</p>
          </button>
        </div>
      </form>
      <div className="search-input-card-list-container">
        {list?.map((data, index) => {
          if (data.Poster !== "N/A") {
            return (
              <MovieCard
                key={index}
                name={data.Title}
                poster={data.Poster}
                year={data.Year}
                id={data.imdbID}
                onClick={() => {
                  if (search) {
                    dispatch(saveMovie({ data, search }));
                  }
                }}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export { WatchLists };
