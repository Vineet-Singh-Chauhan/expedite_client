import React, { useState } from "react";
import "./Input.scss";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
const PasswordInput = ({ ...props }) => {
  const [visible, setVisible] = useState(false);
  const handleVisibilityToggle = (e) => {
    setVisible(!visible);
  };
  return (
    <div className="inputWrapper">
      <div>
        <label htmlFor={props.inputId}>
          {props.label}
          {props.required ? <span>&nbsp;*&nbsp;</span> : ""}
        </label>
        {/* <span className="errorField"></span> */}
      </div>

      <div className="passwordWrapper">
        <input
          id={props.inputId}
          type={visible ? "text" : "password"}
          placeholder={props.placeholder || props.label}
          required={props.required || false}
          name={props.name}
        />
        {visible ? (
          <AiFillEyeInvisible
            className="passwordWrapper__icon"
            onClick={handleVisibilityToggle}
          />
        ) : (
          <AiFillEye
            className="passwordWrapper__icon"
            onClick={handleVisibilityToggle}
          />
        )}
      </div>
    </div>
  );
};

export default PasswordInput;
