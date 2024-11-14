import React, { useEffect, useState } from "react";
import logout from "../../../../assets/user-image.png";
import ellipsis from "../../../../assets/ellipsis.png";
import { userSlice } from "../../../slice/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import powerOff from "../../../../assets/poweroff.png";
import "./Logout.css";
import { moviesSlice } from "../../../slice/moviesSlice";

const Logout = () => {
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const { logOut } = userSlice.actions;
  const { cleanMovieStates } = moviesSlice.actions;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let data = localStorage.getItem("currentUser");
    let user = JSON.parse(data);
    const name = user?.email.split("@");
    setEmail(name[0]);
  }, []);

  return (
    <div className="logout-main-container">
      <div className="logout-wrapper">
        <div className="logout-image-name-wrapper">
          <div className="logout-image-container">
            <img src={logout} alt="logout" className="logout-image" />
          </div>
          <p className="header-text">{email}</p>
        </div>
        {/* <img
          src={ellipsis}
          alt="ellipsis"
          className="ellipsis-image"
          onClick={() => setOpen((p) => !p)}
        /> */}
        {/* {open && (
          <div
            className="logout-button-container header-3"
            onClick={() => {
              dispatch(logOut());
              setOpen(false);
              navigate("/");
            }}
          >
            Logout
          </div>
        )} */}
        <img
          src={powerOff}
          alt="ellipsis"
          className="ellipsis-image"
          onClick={() => {
            dispatch(logOut());
            dispatch(cleanMovieStates());
            setOpen(false);
            navigate("/");
          }}
        />
      </div>
    </div>
  );
};

export { Logout };
