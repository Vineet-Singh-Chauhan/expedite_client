import React, { lazy, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useWorkspace from "../../../hooks/useWorkspace";
import useSocket from "../../../hooks/useSocket";
import { TaskProvider } from "../../../context/TaskProvider";
//*css
import "./MyTasks.scss";
//*Components
const DragNDrop = lazy(() => import("../../components/DragNDrop/DragNDrop"));
const LoadingScreen = lazy(() =>
  import("../../components/LoadingScreen/LoadingScreen")
);

//*Icons
import { FiSettings } from "react-icons/fi";

const MyTasks = () => {
  let params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { socket } = useSocket();
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(true);
  const { activeWorkspace, setActiveWorkspace } = useWorkspace();
  useEffect(() => {
    const workspaceId = params.id;
    const getWorkspaceInfo = async () => {
      try {
        const response = await axiosPrivate.post("/api/workspaceinfo", {
          workspaceId: workspaceId,
        });
        const data = response?.data;
        setActiveWorkspace(data);
      } catch (err) {
        if (err?.response?.status === 401 || err?.response?.status === 404) {
          navigate("/user/404", { state: { from: location }, replace: true });
        } else {
          console.log(err);
          alert(err?.response?.data?.error || "Internal server error");
        }
      } finally {
        setLoading(false);
      }
    };
    getWorkspaceInfo();
    socket.emit("joinWorkspace", workspaceId);
  }, []);

  return (
    <div>
      {loading ? (
        <LoadingScreen status={true} msg={"Loading tasks.."} />
      ) : (
        <>
          <div className="dragNDrop__settingsButton">
            {activeWorkspace.name}
            <Link to={`/user/${activeWorkspace._id}/settings`}>
              <FiSettings />
              Workspace Settings
            </Link>
          </div>
          <TaskProvider>
            <DragNDrop />
          </TaskProvider>
        </>
      )}
    </div>
  );
};

export default MyTasks;
