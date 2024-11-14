import React, { useState } from "react";
import "./PasswordInput.css";
import show from "../../../../assets/eye.png";
import hidden from "../../../../assets/hidden.png";

const PasswordInput = ({ value, onChange }) => {
  const [showPass, setShowPass] = useState(false);
  return (
    <div className="password-input-container input-container">
      <input
        placeholder="Password..."
        type={showPass ? "text" : "password"}
        className="sign-in-password input password-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <img
        src={showPass ? hidden : show}
        alt="eye"
        className="passowrd-input-image"
        onClick={() => setShowPass((p) => !p)}
      />
    </div>
  );
};

export { PasswordInput };
