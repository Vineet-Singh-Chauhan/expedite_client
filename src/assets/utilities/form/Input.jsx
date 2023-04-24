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
import React from "react";
import "./Input.scss";
const Input = ({ ...props }) => {
  return (
    <div className="inputWrapper">
      <div>
        <label htmlFor={props.inputId}>
          {props.label}
          {props.required ? <span>&nbsp;*&nbsp;</span> : ""}
        </label>
        {/* <span className="errorField"></span> */}
      </div>

      <input
        id={props.inputId}
        type={props.type}
        placeholder={props.placeholder || props.label}
        required={props.required || false}
        name={props.name}
      />
    </div>
  );
};

export default Input;
