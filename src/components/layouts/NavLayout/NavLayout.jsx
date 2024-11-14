import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SearchInput } from "../SearchInput/SearchInput";
import { NavLink } from "react-router-dom";
import house from "../../../../assets/house-white.png";
import list from "../../../../assets/list.png";
import { SavedElement } from "../SavedElement/SavedElement";
import { Logout } from "../Logout/Logout";
import "./NavLayout.css";

const NavLayout = () => {
  const [search, setSearch] = useState("");
  const { savedList } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);

  return (
    <div className="navlayout-main-container">
      <div
        className={`navlayout-open-menu-container ${open ? "open" : "close"}`}
        onClick={() => setOpen((p) => !p)}
      >
        <img src={list} alt="list" className="navlayout-open-menu-image" />
      </div>
      <div className={`navlayout-wrapper ${open ? "open" : "close"}`}>
        <div className="navlayout-upper-container">
          <div className="signin-wrapper header nav-header">Watchlists</div>
          <SearchInput value={search} onChange={setSearch} />
          <NavLink to="/home" className="navlink-wrapper">
            <img src={house} alt="house" className="navlink-image" />
            <p className="header-text">Home</p>
          </NavLink>
          <div className="saved-list-container">
            <p className="header-3">My Lists</p>
            {savedList.map((element, i) => {
              return (
                <SavedElement key={i} listName={element.listName} index={i} />
              );
            })}
          </div>
        </div>

        <div
          className={`navlayout-logout-container ${open ? "open" : "close"}`}
        >
          <Logout />
        </div>
      </div>
      <div className="navlayout-outlet-main-container">
        <Outlet />
      </div>
    </div>
  );
};

export { NavLayout };
