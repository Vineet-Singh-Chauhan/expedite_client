import React, { useRef } from "react";

//*CSS
import "./Notifications.scss";

//*Icons
import { IoIosNotifications } from "react-icons/io";

const Notifications = () => {
  const trayRef = useRef();
  const toggleTray = () => {
    trayRef.current.style.display = "block";
  };
  const handleOverlayClick = () => {
    trayRef.current.style.display = "none";
  };
  return (
    <div className="workSpace__notification">
      <IoIosNotifications
        className="workSpace__notificationIcon"
        onClick={toggleTray}
      />
      <div className="notificationsTray" ref={trayRef}>
        <div value={"test"}>hello sd</div>
        <div value={"test2"}> Lorem, ipsum dolor. </div>
        <div value={"test3"}>Lsdfnsg o</div>

        <div value={"new"}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et aliquam
          officiis facilis inventore a cum obcaecati sunt eaque porro sit,
          aspernatur molestias, alias officia consequuntur nihil ratione illo
          fugit. Nesciunt.
        </div>
        <span className="overlay" onClick={handleOverlayClick}></span>
      </div>
    </div>
  );
};

export default Notifications;
