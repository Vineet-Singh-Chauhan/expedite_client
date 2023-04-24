import React from "react";
import "./MainButton.scss";
const MainButton = ({ title, type, Icon, onClick, className }) => {
  return (
    <button
      className={`utilities__mainButton ${className}`}
      type={type}
      onClick={onClick}
    >
      {Icon && <span className="icon">{Icon}</span>}
      <span>{title}</span>
    </button>
  );
};

export default MainButton;
