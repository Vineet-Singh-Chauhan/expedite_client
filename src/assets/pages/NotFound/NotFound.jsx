import React from "react";
//*css
import "./NotFound.scss";
//*icons
import { TbError404 } from "react-icons/tb";
const NotFound = () => {
  return (
    <div className="NotFound">
      <div className="iconContainer">
        <TbError404 />
        <div>
          Oops.. Page you're looking for is not available yet!&nbsp;
          <a href="#">GO BACK</a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
