import React from "react";
//*css
import "./EmptyWorkspace.scss";
//*icons
import { AiOutlineContainer } from "react-icons/ai";

const EmptyWorkspace = () => {
  return (
    <div className="EmptyWorkspace">
      <div className="iconContainer">
        <AiOutlineContainer />
        <div>Please select a workspace to continue or create a new one</div>
      </div>
    </div>
  );
};

export default EmptyWorkspace;
