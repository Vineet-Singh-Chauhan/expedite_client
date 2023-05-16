import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import MainPageOutlet from "../../components/MainPageOutlet";

//*CSS
import "./Main.scss";

//*Components
import Navbar from "../../components/Main/Navbar/Navbar";
import SideBar from "../../components/Main/Sidebar/SideBar";
import EmptyWorkspace from "../../components/EmptyWorkspace/EmptyWorkspace";
import NotFound from "../NotFound/NotFound";
import Settings from "../Settings/Settings";
import NetworkIssue from "../../components/NetworkIssue/NetworkIssue";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import useLoadingScreen from "../../components/LoadingScreen/useLoadingScreen";
// import WorkspaceSettings from "../WorkspaceSettings/WorkspaceSettings";
// import UserInfo from "../../components/SettingsComponents/UserInfo/UserInfo";
// import WorkspaceTasks from "../WorspaceTasks/WorkspaceTasks";
import MyTasks from "../MyTasks/MyTasks";
// import TaskCardExpanded from "../../components/TaskCardExpanded/TaskCardExpanded";
const Main = () => {
  const { status, setLoadingStatus } = useLoadingScreen();
  const { user, setUser } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getUser = async () => {
      setLoadingStatus(true);
      try {
        const response = await axiosPrivate.post("/api/getuser", {
          signal: controller.signal,
          withCredentials: true,
          credentials: "include",
        });
        console.log(response.data);
        isMounted && setUser(response.data);
        console.log(user);
      } catch (err) {
        console.error(err);
        navigate("/auth", { state: { from: location }, replace: true });
      } finally {
        setLoadingStatus(false);
      }
    };

    getUser();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  return (
    <>
      <LoadingScreen
        status={status}
        hide={() => {
          setLoadingStatus(false);
        }}
      />
      {user && (
        <div className="mainPage">
          {/* <Link to="/dummy">Dummy</Link> */}
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
                  <Route path="/:id/" element={<MyTasks />} />
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
      )}
    </>
  );
};

export default Main;
