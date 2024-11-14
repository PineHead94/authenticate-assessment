import React, { useEffect } from "react";
import "./Welcome.css";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/home");
    }, 3000);
  }, []);

  return (
    <div className="welcome-main-container">
      <div className="signin-wrapper header">Watchlists</div>
    </div>
  );
};

export { Welcome };
