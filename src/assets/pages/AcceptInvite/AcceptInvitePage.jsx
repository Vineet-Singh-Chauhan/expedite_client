import React, { useState } from "react";
import AcceptInvite from "../../components/AcceptInvite/AcceptInvite";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "../../../api/axios";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import useLoadingScreen from "../../components/LoadingScreen/useLoadingScreen";

const AcceptInvitePage = () => {
  const params = useParams();
  const info = params.inviteInfo;
  const [resMsg, setResMsg] = useState();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const { status, setLoadingStatus } = useLoadingScreen();

  useEffect(() => {
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
