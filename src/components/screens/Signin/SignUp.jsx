import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import arrow from "../../../../assets/arrow-left.png";
import { signUp, userSlice } from "../../../slice/userSlice";
import { ErrorModal } from "../../layouts/ErrorModal/ErrorModal";
import { PasswordInput } from "../../layouts/PasswordInput/PasswordInput";
import "./SignIn.css";

const SignUp = () => {
  const { users } = useSelector((state) => state.user);
  const { closeErrorModal } = userSlice.actions;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="signin-container">
      <div className="error-modal-container-sign-in">
        <ErrorModal
          message="Details Missing"
          open={error}
          onClick={() => dispatch(closeErrorModal())}
        />
      </div>
      <div className="signin-border-container">
        <div className="signin-wrapper header">Sign Up</div>
        <div className="signin-sub-wrapper">
          <form>
            <div className="signin-input-email-container input-container">
              <input
                placeholder="Email..."
                type="email"
                className="sign-in-input input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="signin-input-password-container">
              <PasswordInput value={password} onChange={setPassword} />
            </div>
            <div className="signin-button-container signup-button-container">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/");
                  dispatch(closeErrorModal());
                }}
                className="header-button button-text back-button-signup"
              >
                <img src={arrow} alt="logo" className="arrow-image" />
              </button>
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(signUp({ email, password })).then((data) => {
                    if (data.payload.auth) {
                      navigate("/");
                    }
                  });
                }}
                className="header-button button-text signup-button"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export { SignUp };
