import React from "react";
import search from "../../../../assets/icons8-search-50.png";
import house from "../../../../assets/house-white.png";
import "./SearchInput.css";

const SearchInput = ({ value, onChange }) => {
  return (
    <div className="search-input-container">
      <div className="password-input-container input-container">
        <img
          src={search}
          alt="search"
          className="passowrd-input-image search-input-image"
        />
        <input
          placeholder="Search..."
          type="text"
          className="sign-in-password input password-input search-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export { SearchInput };
