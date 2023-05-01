import React from "react";
//*css
import "./Spinner.scss";
const Spinner = ({ size, stroke }) => {
  return (
    <div
      className="spinner"
      style={{ width: size, height: size, borderWidth: stroke }}
    ></div>
  );
};

export default Spinner;
