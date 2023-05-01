import React from "react";
//*css
import "./NotFound.scss";
//*icons
import { TbError404 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
const NotFound = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  return (
    <div className="NotFound">
      <div className="iconContainer">
        <TbError404 />
        <div>
          Oops.. Page you're looking for is not available yet!&nbsp;
          <span onClick={goBack}>GO BACK</span>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
