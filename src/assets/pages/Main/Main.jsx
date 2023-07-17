import React, { lazy, useEffect, useState } from "react";
import {
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

//*CSS
import "./Main.scss";

//*Components
const Navbar = lazy(() => import("../../components/Main/Navbar/Navbar"));
const SideBar = lazy(() => import("../../components/Main/Sidebar/SideBar"));
const EmptyWorkspace = lazy(() =>
  import("../../components/EmptyWorkspace/EmptyWorkspace")
);
const NotFound = lazy(() => import("../NotFound/NotFound"));
const Settings = lazy(() => import("../Settings/Settings"));
const MyTasks = lazy(() => import("../MyTasks/MyTasks"));
const WorkspaceSettings = lazy(() =>
  import("../WorkspaceSettings/WorkspaceSettings")
);
const FallbackLoading = lazy(() =>
  import("../../components/FallbackLoading/FallbackLoading")
);

const Main = () => {
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getUser = async () => {
      setLoading(true);
      try {
        const response = await axiosPrivate.post("/api/getuser", {
          signal: controller.signal,
          withCredentials: true,
          credentials: "include",
        });
        isMounted && setUser(response.data);
      } catch (err) {
        console.error(err);
        navigate("/auth", { state: { from: location }, replace: true });
      } finally {
        setLoading(false);
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
      {loading ? (
        <>
          <FallbackLoading />
        </>
      ) : (
        <></>
      )}

      {user && (
        <div className="mainPage">
          <div className="main__navbarContainer">
            <Navbar />
          </div>
          <div className="main__mainScreen">
            <div className="main__sidebarWrap">
              <SideBar />
            </div>
            <div className="main__workspaceArea">
              <Routes>
                <Route element={<Outlet />}>
                  <Route path="/" element={<EmptyWorkspace />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/:id/" element={<MyTasks />} />
                  <Route path="/:id/settings" element={<WorkspaceSettings />} />
                  <Route path="/404" element={<NotFound />} />
                </Route>
              </Routes>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Main;
