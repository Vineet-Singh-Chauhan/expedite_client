import React from "react";
import { Route, Routes } from "react-router-dom";

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
import { Link } from "react-router-dom";
import EmptyWorkspace from "../../components/EmptyWorkspace/EmptyWorkspace";
import MainPageOutlet from "../../components/MainPageOutlet";
import NotFound from "../NotFound/NotFound";
const Main = () => {
  return (
    <div className="mainPage">
      <Link to="/dummy">Dummy</Link>
      <div className="main__navbarContainer">
        <Navbar />
      </div>
      <div className="main__mainScreen">
        <div className="main__sidebarWrap">
          <SideBar />
        </div>
        <div className="main__workspaceArea">
          <Routes>
            <Route element={<MainPageOutlet />}>
              <Route path="/" element={<EmptyWorkspace />} />
              <Route path="/home" element={<EmptyWorkspace />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
              {/* <Route path="/reset" element={<ResetPassword />} />
            <Route path="/dummy" element={<Dummy />} /> */}
            </Route>
          </Routes>
          {/* <MainPageOutlet /> */}
          {/* <EmptyWorkspace /> */}
          {/* <Settings /> */}
          {/* <UserInfo /> */}
          {/* <WorkspaceSettings /> */}
          {/* <WorkspaceTasks /> */}
          {/* <CreateNewTask /> */}
          {/* <MyTasks /> */}
          {/* <NetworkIssue /> */}
        </div>
      </div>
    </div>
  );
};

export default Main;
