import React, { useRef } from "react";
//*CSS
import "./WorkspaceSelector.scss";
//* Icons
import { FiChevronDown } from "react-icons/fi";

const Index = () => {
  const trayRef = useRef();
  const toggleTray = () => {
    trayRef.current.style.display = "block";
  };
  const handleOverlayClick = () => {
    trayRef.current.style.display = "none";
  };
  return (
    <div className="workspaceSelector">
      <div className="workSpace__logo">T</div>
      <div className="workSpace__name">
        <div className="workSpace__select" onClick={toggleTray}>
          <span>Test</span>
          <FiChevronDown />
        </div>

        <div className="workSpaces__options" ref={trayRef}>
          <div value={"test"}>Test</div>
          <div value={"test2"}>Test2</div>
          <div value={"test3"}>Test3</div>
          <div value={"test4"}>Test4</div>
          <div value={"new"}>
            Create new workspace ghxghfd dy sy dtysdsy Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Minus, repellat.
          </div>

          <span className="overlay" onClick={handleOverlayClick}></span>
        </div>
      </div>
    </div>
  );
};

export default Index;
