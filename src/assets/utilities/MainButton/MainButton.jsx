import React from "react";
//*CSS
import "./MainButton.scss";
const MainButton = ({ title, type, Icon, onClick, className, disabled }) => {
  return (
    <button
      className={`utilities__mainButton ${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {Icon && <span className="icon">{Icon}</span>}
      <span>{title}</span>
    </button>
  );
};

export default MainButton;
