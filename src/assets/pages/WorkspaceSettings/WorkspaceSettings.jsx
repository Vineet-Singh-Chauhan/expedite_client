import React, { useRef } from "react";
import "./WorkspaceSettings.scss";
import Editable from "../../utilities/EditableInput/EditableInput";
import WorkspaceInfo from "../../components/SettingsComponents/WorkspaceInfo/WorkspaceInfo";
const WorkspaceSettings = () => {
  const inputRef = useRef();
  return (
    <div className="workspaceSettingsPage">
      <WorkspaceInfo />
    </div>
  );
};

export default WorkspaceSettings;
