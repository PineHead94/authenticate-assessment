import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userSlice } from "../../../slice/userSlice";
import { ErrorModal } from "../../layouts/ErrorModal/ErrorModal";
import { PasswordInput } from "../../layouts/PasswordInput/PasswordInput";
import { signIn } from "../../../slice/userSlice";
import "./SignIn.css";

const SignIn = () => {
  const { closeErrorModal, cleanSignIn } = userSlice.actions;
  const { error, auth } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(cleanSignIn());
  }, []);

  return (
    <div className="signin-container">
      <div className="signin-border-container">
        <div className="signin-wrapper header">Sign In</div>
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
            <div className="signin-button-container">
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(signIn({ email, password })).then((data) => {
                    if (data.payload.auth) {
                      navigate("/welcome");
                    }
                  });
                }}
                className="header-button button-text"
              >
                Sign In
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  navigate("signup");
                  dispatch(closeErrorModal());
                }}
                className="header-button button-text signup-button"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="error-modal-container-sign-in">
        <ErrorModal
          message="Invalid Credentials"
          open={error}
          onClick={() => {
            dispatch(closeErrorModal());
          }}
        />
      </div>
    </div>
  );
};

export { SignIn };
