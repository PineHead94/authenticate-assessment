import React from "react";
import save from "../../../../assets/bookmark.png";
import "./MovieCard.css";

const MovieCard = ({ name, poster, year, onClick, removeBookmark }) => {
  return (
    <div className="movie-card-container">
      <div className="movie-card-image-container">
        <img src={poster} alt="poster" className="movie-card-image" />
        {!removeBookmark && (
          <img
            src={save}
            alt="save"
            className="save-image"
            onClick={() => onClick()}
          />
        )}
      </div>
      <div className="movie-detail-container">
        <p className="movie-name-text header-3">{name}</p>
        <p className="movie-year-text header-3">({year})</p>
      </div>
    </div>
  );
};

export { MovieCard };
