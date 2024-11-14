import React from "react";
import closeIcon from "../../../../assets/close.png";
import { userSlice } from "../../../slice/userSlice";
import "./ErrorModal.css";
import { useDispatch } from "react-redux";

const ErrorModal = ({ message, open, onClick }) => {
  const dispatch = useDispatch();
  const { closeErrorModal } = userSlice.actions;
  return (
    <div
      className={`error-modal-container ${
        open ? "error-modal-container-open" : ""
      }`}
    >
      <p className="error-modal-text header-2">{message}</p>
      <img
        onClick={() => onClick()}
        src={closeIcon}
        alt="close"
        className="error-modal"
      />
    </div>
  );
};

export { ErrorModal };
