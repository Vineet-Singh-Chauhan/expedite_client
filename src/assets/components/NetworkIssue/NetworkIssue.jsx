import React from "react";
//*css
import "./NetworkIssue.scss";
//*Icons
import { RiSignalWifiErrorFill } from "react-icons/ri";
const NetworkIssue = () => {
  return (
    <div className="NetworkIssue">
      <div className="iconContainer">
        <RiSignalWifiErrorFill />
        <div>Poor internet connection</div>
      </div>
    </div>
  );
};

export default NetworkIssue;
