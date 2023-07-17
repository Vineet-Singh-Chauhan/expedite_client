import React, { useState } from "react";
//*CSS
import "./Input.scss";
//*icons
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

const PasswordInput = (props) => {
  const [visible, setVisible] = useState(false);
  const [wasFocused, setWasFocused] = useState(false);

  const handleVisibilityToggle = (e) => {
    setVisible(!visible);
  };
  const handleBlur = (e) => {
    setWasFocused(true);
  };
  return (
    <div className="inputWrapper">
      <div>
        <label htmlFor={props.inputId}>
          {props.label}
          {props.required ? <span>&nbsp;*&nbsp;</span> : <></>}
        </label>
        <span className="errorField">
          {props.name === "confirmPassword" ||
          props.name === "confirmNewPassword"
            ? "Passwords do not match!"
            : props.errorMsg}
        </span>
      </div>

      <div className="passwordWrapper">
        <input
          id={props.inputId}
          type={visible ? "text" : "password"}
          placeholder={props.placeholder || props.label}
          required={props.required || false}
          name={props.name}
          onChange={props.onChange}
          pattern={props.pattern}
          onBlur={handleBlur}
          focused={wasFocused.toString()}
          onFocus={() => {
            props.name == "confirmPassword" && setWasFocused(true);
          }}
          autoComplete="true"
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
