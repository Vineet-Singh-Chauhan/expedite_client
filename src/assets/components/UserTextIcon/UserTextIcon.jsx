import React from "react";
//*css
import "./UserTextIcon.scss";
const UserTextIcon = ({ text, bgColor }) => {
  return (
    <div
      className="UserTextIcon"
      style={{ backgroundColor: bgColor || "#1ac888" }}
    >
      {text}
    </div>
  );
};

export default UserTextIcon;
