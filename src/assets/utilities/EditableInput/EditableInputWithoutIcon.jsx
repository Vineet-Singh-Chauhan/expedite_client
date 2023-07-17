import React, { useState, useEffect } from "react";
//*css
import "./EditableInputWithoutIcon.scss";

const EditableInputWithoutIcon = ({
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
    <div className="editableWithoutIcon__inputWrapperOuter" {...props}>
      {isEditing ? (
        <div
          className="editable__inputWrapper"
          onBlur={() => setEditing(false)}
          onKeyDown={(e) => handleKeyDown(e, type)}
        >
          <span className="editable__content">{children}</span>
        </div>
      ) : (
        <div className="editable__inputWrapper">
          <span className="editable__content" onClick={() => setEditing(true)}>
            <span>{text || placeholder || "Editable content"}</span>
          </span>
        </div>
      )}
    </div>
  );
};

export default EditableInputWithoutIcon;
