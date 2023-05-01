/* 
*To be used as
<Input
inputId="email"
name="email"
label="Email address"
type="email"
required={true}
/>
*/
import React, { useState } from "react";
import "./Input.scss";
const Input = (props) => {
  const [wasFocused, setWasFocused] = useState(false);
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
        {/* {props.errorMsg ? ( */}
        <span className="errorField">{props.errorMsg}</span>
        {/* ) : ( */}
        {/* <></> */}
        {/* )} */}
      </div>

      <input
        id={props.inputId}
        type={props.type}
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
      />
    </div>
  );
};

export default Input;
