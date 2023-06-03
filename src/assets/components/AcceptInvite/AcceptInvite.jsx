import React, { useState } from "react";
//*css
import "./AcceptInvite.scss";
import Input from "../../utilities/form/Input";
import MainButton from "../../utilities/MainButton/MainButton";
import Spinner from "../../utilities/Spinner/Spinner";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const AcceptInvite = ({ data }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
  const [resMsg, setResMsg] = useState();
  const params = useParams();
  const inviteInfo = params.inviteInfo;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResMsg();
    try {
      const response = await axiosPrivate.post("/api/acceptinvite", {
        inviteInfo,
      });
      const workspaceId = response?.data?.workspaceId;
      console.log(workspaceId);
      console.log(response?.data);
      if (response?.status === 403 || response?.status === 401) {
        navigate("/auth", { state: { from: location }, replace: true });
      }
      navigate(`/user/${workspaceId}`, {
        state: { from: location },
        replace: true,
      });
    } catch (err) {
      if (err?.response?.status === 403 || err?.response?.status === 401) {
        navigate("/auth", { state: { from: location }, replace: true });
      }
      setResMsg(err?.response?.data?.error || err?.message);
    } finally {
      setLoading(false);
    }
  };
  const [loading, setLoading] = useState(false);
  return (
    <div className="acceptInvite">
      <div className="container acceptInviteContent">
        <div className="logo">Expedite</div>
        <div>
          {resMsg ? <div className="resMsgFieldError">{resMsg}</div> : <></>}
          <p>
            Hello {data.user}, You have been invited to join workspace -{" "}
            {data.workspaceName}.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <MainButton
              className="mx-auto"
              type="submit"
              disabled={loading}
              title={loading ? "In progress..." : "Accept Invite"}
              Icon={loading && <Spinner size={"20px"} stroke={"3px"} />}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AcceptInvite;
