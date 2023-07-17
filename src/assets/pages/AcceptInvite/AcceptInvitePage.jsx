import React, { lazy, useState } from "react";
import axios from "../../../api/axios";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useLoadingScreen from "../../components/LoadingScreen/useLoadingScreen";

//*components
const AcceptInvite = lazy(() =>
  import("../../components/AcceptInvite/AcceptInvite")
);
const LoadingScreen = lazy(() =>
  import("../../components/LoadingScreen/LoadingScreen")
);

const AcceptInvitePage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState();
  const [resMsg, setResMsg] = useState();
  const [loading, setLoading] = useState(true);
  const { status, setLoadingStatus } = useLoadingScreen();
  const info = params.inviteInfo;

  const fetchInvite = async () => {
    setLoading(true);
    setLoadingStatus();
    setResMsg();
    try {
      const response = await axios.post("/api/inviteinfo", {
        inviteInfo: info,
      });
      setData(response?.data);
      setLoading(false);
    } catch (err) {
      setLoadingStatus("error");
      setResMsg(err?.response.data.error || err.message);
      if (err?.response?.status === 403 || err?.response?.status === 401) {
        navigate("/auth", { state: { from: location }, replace: true });
      }
    }
  };

  useEffect(() => {
    fetchInvite();
  }, []);

  return (
    <div>
      {loading ? (
        <LoadingScreen status={status} msg={resMsg} hide={() => {}} />
      ) : (
        <AcceptInvite
          data={{ user: data?.userName, workspaceName: data?.workspaceName }}
        />
      )}
    </div>
  );
};

export default AcceptInvitePage;
