import React, { useEffect, useRef, useState } from "react";
import "./WorkspaceSettings.scss";
import WorkspaceInfo from "../../components/SettingsComponents/WorkspaceInfo/WorkspaceInfo";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import useWorkspace from "../../../hooks/useWorkspace";

const WorkspaceSettings = () => {
  const params = useParams();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState();
  const { setActiveWorkspace } = useWorkspace();
  const [loading, setLoading] = useState(true);
  const workspaceId = params.id;
  const getWorkspaceInfo = async () => {
    try {
      const response = await axiosPrivate.post("/api/workspaceinfo", {
        workspaceId: workspaceId,
      });
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

  useEffect(() => {
    getWorkspaceInfo();
  }, []);

  return (
    <div className="workspaceSettingsPage">
      {loading ? (
        <LoadingScreen status={true} msg={"Loading tasks.."} />
      ) : (
        <WorkspaceInfo />
      )}
    </div>
  );
};

export default WorkspaceSettings;
