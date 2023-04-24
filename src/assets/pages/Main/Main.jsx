import React from "react";

//*CSS
import "./Main.scss";

//*Components
import Navbar from "../../components/Main/Navbar/Navbar";
import SideBar from "../../components/Main/Sidebar/SideBar";
import WorkspaceSettings from "../WorkspaceSettings/WorkspaceSettings";
import Settings from "../Settings/Settings";
import UserInfo from "../../components/SettingsComponents/UserInfo/UserInfo";
import WorkspaceTasks from "../WorspaceTasks/WorkspaceTasks";
import MyTasks from "../MyTasks/MyTasks";
import TaskCardExpanded from "../../components/TaskCardExpanded/TaskCardExpanded";
import NetworkIssue from "../../components/NetworkIssue/NetworkIssue";

const Main = () => {
  return (
    <div className="mainPage">
      <div className="main__navbarContainer">
        <Navbar />
      </div>
      <div className="main__mainScreen">
        <div className="main__sidebarWrap">
          <SideBar />
        </div>
        <div className="main__workspaceArea">
          {/* <Settings /> */}
          {/* <UserInfo /> */}
          {/* <WorkspaceSettings /> */}
          {/* <WorkspaceTasks /> */}
          {/* <CreateNewTask /> */}
          {/* <MyTasks /> */}
          <NetworkIssue />
        </div>
      </div>
    </div>
  );
};

export default Main;
