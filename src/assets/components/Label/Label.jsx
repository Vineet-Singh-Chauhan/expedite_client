import React from "react";

//*css
import "./Label.scss";
const Label = ({ text, bgColor }) => {
  return (
    <div className="taskLabel" style={{ backgroundColor: bgColor }}>
      {text}
    </div>
  );
};

export default Label;
