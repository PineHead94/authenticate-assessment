import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import logo from "../../../../assets/tv-app.png";
import { useDispatch, useSelector } from "react-redux";
import { userSlice } from "../../../slice/userSlice";
import "./Header.css";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { auth, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { logOut } = userSlice.actions;

  return (
    <div className="header-container">
      {/* <div className="header-wrapper">
        <img src={logo} alt="logo" className="header-image" />
        {auth && (
          <button
            onClick={() => {
              dispatch(logOut());
              navigate("/");
            }}
            className="header-button button-text"
          >
            Logout
          </button>
        )}
      </div> */}
      <div className="header-wrapper-outlet">
        <Outlet />
      </div>
    </div>
  );
};

export { Header };
