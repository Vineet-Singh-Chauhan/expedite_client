// import { Edit } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import "./EditableInput.scss";
import { FiEdit2 } from "react-icons/fi";
const Editable = ({
  childRef,
  text,
  type,
  placeholder,
  children,
  ...props
}) => {
  const [isEditing, setEditing] = useState(false);
  useEffect(() => {
    if (childRef && childRef.current && isEditing === true) {
      childRef.current.focus();
    }
  }, [isEditing, childRef]);
  // Event handler while pressing any key while editing
  const handleKeyDown = (event, type) => {
    // Handle when key is pressed
  };

  return (
    <div className={`editable__inputWrapperOuter `}>
      {props.noteditable ? (
        <div className="editable__inputWrapper">
          <span className="editable__content">
            <span className={props.className}>
              {text || placeholder || "Editable content"}
            </span>
          </span>
        </div>
      ) : isEditing ? (
        <div
          className="editable__inputWrapper"
          onBlur={() => setEditing(false)}
          onKeyDown={(e) => handleKeyDown(e, type)}
        >
          <span className="editable__content">{children}</span>
          <span
            className="editable__editIcon"
            onClick={() => setEditing(!isEditing)}
          >
            <FiEdit2 />
          </span>
        </div>
      ) : (
        <div className="editable__inputWrapper">
          <span className="editable__content">
            <span className={props.className}>
              {text || placeholder || "Editable content"}
            </span>
          </span>
          <span className="editable__editIcon" onClick={() => setEditing(true)}>
            <FiEdit2 />
          </span>
        </div>
      )}
      {}
    </div>
  );
};

export default Editable;
