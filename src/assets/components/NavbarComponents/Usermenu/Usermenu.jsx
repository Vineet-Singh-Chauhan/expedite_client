import React, { useRef } from "react";

//*CSS
import "./Usermenu.scss";
const Usermenu = () => {
  const trayRef = useRef();
  const toggleTray = () => {
    trayRef.current.style.display = "block";
  };
  const handleOverlayClick = () => {
    trayRef.current.style.display = "none";
  };
  return (
    <div className="usermenu">
      <div className="user__logo" onClick={toggleTray}>
        V
      </div>
      <div className="userMenuTray" ref={trayRef}>
        <div>Account Settings</div>
        <div>Logout</div>
        <span className="overlay" onClick={handleOverlayClick}></span>
      </div>
    </div>
  );
};

export default Usermenu;
