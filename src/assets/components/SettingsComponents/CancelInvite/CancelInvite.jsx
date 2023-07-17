import React, { lazy, useState } from "react";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";
import useWorkspace from "../../../../hooks/useWorkspace";
//*CSS
import "./CancelInvite.scss";
//*Components
const MainButton = lazy(() =>
  import("../../../utilities/MainButton/MainButton")
);
const Spinner = lazy(() => import("../../../utilities/Spinner/Spinner"));

const CancelInvite = ({ email, workspaceId, hide }) => {
  const axiosPrivate = useAxiosPrivate();
  const [resMsg, setResMsg] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { setActiveWorkspace } = useWorkspace();
  const handleRemove = async (e) => {
    e.preventDefault();
    setResMsg();
    try {
      setLoading(true);

      const response = await axiosPrivate.post("/api/cancelinvite", {
        email: email,
        workspaceId: workspaceId,
      });
      console.log(response);
      if (response?.status === 403 || response?.status === 401) {
        navigate("/auth", { state: { from: location }, replace: true });
      }
      if (response?.status === 204) {
        setActiveWorkspace((old) => {
          const index = old.invitedMembers.indexOf(email);
          if (index != -1) {
            old.invitedMembers.splice(index, 1);
          }
          return { ...old };
        });
        console.log(response?.data);
        hide();
      }
    } catch (err) {
      if (err?.response?.status === 403 || err?.response?.status === 401) {
        navigate("/auth", { state: { from: location }, replace: true });
      }
      console.log(err.message);
      setResMsg(err.response.data.error || err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="RemoveMemberConfirmModal">
      {resMsg ? <div className="resMsgFieldError">{resMsg}</div> : <></>}
      <h2> Cancel invitation ?</h2>
      <p>
        Are you sure to cancel invite for <b>{email}</b> for this workspace ?
      </p>
      <div className="RemoveMemberConfirmModal__btnGrp">
        <MainButton
          className="mx-auto"
          onClick={handleRemove}
          type={"submit"}
          disabled={loading}
          title={loading ? "In progress..." : "Yes"}
          Icon={loading && <Spinner size={"20px"} stroke={"3px"} />}
        />
        <MainButton className="mx-auto" title="Cancel" onClick={hide} />
      </div>
    </div>
  );
};

export default CancelInvite;
