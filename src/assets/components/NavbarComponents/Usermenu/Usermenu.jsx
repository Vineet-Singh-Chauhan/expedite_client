import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import useSignout from "../../../../hooks/useSignout";
//*CSS
import "./Usermenu.scss";
const Usermenu = ({ firstName }) => {
  const navigate = useNavigate();
  const signout = useSignout();
  const trayRef = useRef();
  const toggleTray = () => {
    trayRef.current.style.display = "block";
  };
  const handleOverlayClick = () => {
    trayRef.current.style.display = "none";
  };
  const handleSignOut = async () => {
    await signout();
    navigate("/auth");
  };
  return (
    <div className="usermenu">
      <div className="user__logo" onClick={toggleTray}>
        {firstName.slice(0, 1).toUpperCase()}
      </div>
      <div className="userMenuTray" ref={trayRef}>
        <Link to="/user/settings">
          <div>Account Settings</div>
        </Link>
        <div onClick={handleSignOut}>Sign Out</div>
        <span className="overlay" onClick={handleOverlayClick}></span>
      </div>
    </div>
  );
};

export default Usermenu;
