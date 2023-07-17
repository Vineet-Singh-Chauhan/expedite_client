import React, { useRef } from "react";
import { Link } from "react-router-dom";
import useWorkspace from "../../../../hooks/useWorkspace";
//*CSS
import "./WorkspaceSelector.scss";
//* Icons
import { FiChevronDown } from "react-icons/fi";

const Index = ({ workspaces }) => {
  const { activeWorkspace } = useWorkspace();
  const trayRef = useRef();
  const toggleTray = () => {
    trayRef.current.style.display = "block";
  };
  const handleOverlayClick = () => {
    trayRef.current.style.display = "none";
  };
  return (
    <div className="workspaceSelector">
      <div className="workSpace__logo">
        {activeWorkspace?.name?.slice(0, 1).toUpperCase() || "S"}
      </div>
      <div className="workSpace__name">
        <div className="workSpace__select" onClick={toggleTray}>
          <span>{activeWorkspace?.name || "Select"}</span>
          <FiChevronDown />
        </div>

        <div className="workSpaces__options" ref={trayRef}>
          {workspaces.map((e, i) => (
            <Link key={i} to={`/user/${e._id}`}>
              <div>{e.name}</div>
            </Link>
          ))}
          {workspaces.length === 0 ? <div>No workspaces</div> : <></>}

          <span className="overlay" onClick={handleOverlayClick}></span>
        </div>
      </div>
    </div>
  );
};

export default Index;
