import React from "react";

//*CSS
import "./Settings.scss";
//*Components
import UserInfo from "../../components/SettingsComponents/UserInfo/UserInfo";
import WorkspaceInfo from "../../components/SettingsComponents/WorkspaceInfo/WorkspaceInfo";

const Settings = () => {
  return (
    <div className="settingsPage">
      <UserInfo />
      <WorkspaceInfo />
    </div>
  );
};

export default Settings;
