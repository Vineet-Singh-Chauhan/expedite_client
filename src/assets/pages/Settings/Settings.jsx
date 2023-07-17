import React, { lazy } from "react";

//*CSS
import "./Settings.scss";
//*Components
const UserInfo = lazy(() =>
  import("../../components/SettingsComponents/UserInfo/UserInfo")
);

const Settings = () => {
  return (
    <div className="settingsPage">
      <UserInfo />
    </div>
  );
};

export default Settings;
