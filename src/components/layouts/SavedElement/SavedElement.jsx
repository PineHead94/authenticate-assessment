import React from "react";
import "./SavedElement.css";
import letterM from "../../../../assets/letter-m.png";
import closeIcon from "../../../../assets/close.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeSaved } from "../../../slice/userSlice";

const SavedElement = ({ listName, index }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { savedList } = useSelector((state) => state.user);

  return (
    <div
      className="saved-element-container"
      onClick={() => navigate(`/lists/${listName}`, { state: index })}
    >
      <div className="saved-element-wrapper">
        <img src={letterM} alt="letter m" className="saved-element-image" />
        <p className="saved-element-text header-3">{listName}</p>
      </div>
      <img
        src={closeIcon}
        alt="close"
        className="error-modal"
        onClick={() => {
          dispatch(removeSaved({ listName, savedList })).then(() => {
            navigate("/home");
          });
        }}
      />
    </div>
  );
};

export { SavedElement };
