import React, { useState } from "react";
//*CSS
import "./RemoveMemberConfirm.scss";
//*Components
import MainButton from "../../../utilities/MainButton/MainButton";
import Spinner from "../../../utilities/Spinner/Spinner";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";
const RemoveMemberConfirm = ({ name, workspaceId, userId, hide }) => {
  console.log(workspaceId, userId);
  const axiosPrivate = useAxiosPrivate();
  const [resMsg, setResMsg] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const handleRemove = async (e) => {
    e.preventDefault();
    setResMsg();
    try {
      setLoading(true);

      const response = await axiosPrivate.post("/api/removemember", {
        userId: userId,
        workspaceId: workspaceId,
      });
      console.log(response);
      if (response?.status === 403 || response?.status === 401) {
        navigate("/auth", { state: { from: location }, replace: true });
      }
      if (response?.status === 204) {
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
      <h2> Remove Member ?</h2>
      <p>Are you sure to remove {name} from this workspace ?</p>
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

export default RemoveMemberConfirm;
