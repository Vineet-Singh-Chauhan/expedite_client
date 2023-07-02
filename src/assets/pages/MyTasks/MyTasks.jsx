import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
//*css
import "./MyTasks.scss";
//*Components
import DragNDrop from "../../components/DragNDrop/DragNDrop";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import { FiSettings } from "react-icons/fi";
import useWorkspace from "../../../hooks/useWorkspace";

const MyTasks = () => {
  const [data, setData] = useState();
  const [workspaceInfo, setWorkspaceInfo] = useState({});
  const { activeWorkspace, setActiveWorkspace } = useWorkspace();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  let params = useParams();
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    const workspaceId = params.id;

    const getWorkspaceInfo = async () => {
      try {
        const response = await axiosPrivate.post("/api/workspaceinfo", {
          workspaceId: workspaceId,
        });
        const taskResponse = await axiosPrivate.post("/api/gettasks", {
          workspaceId: workspaceId,
        });
        const tasks = taskResponse?.data?.tasks;
        setData(tasks);
        const data = response?.data;
        console.log(data);
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
          <DragNDrop data={data} />
        </>
      )}
    </div>
  );
};

export default MyTasks;
