import React, { useContext, useState } from "react";
//*css
import "./CreateWorkspace.scss";
import Input from "../../utilities/form/Input";
import MainButton from "../../utilities/MainButton/MainButton";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Spinner from "../../utilities/Spinner/Spinner";
import { useLocation, useNavigate } from "react-router-dom";
import WorkspaceContext from "../../../context/WorkspaceProvider";

const CreateWorkspace = ({ hide }) => {
  const { activeWorkspace, setActiveWorkSpace } = useContext(WorkspaceContext);
  const [errMsg, setErrMsg] = useState("This field is required!");
  const [resMsg, setResMsg] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.target.querySelectorAll("input").forEach((e) => {
      e.setAttribute("focused", true);
    });
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    if (data.workspaceName) {
      try {
        setLoading(true);
        const response = await axiosPrivate.post("/api/createworkspace", data);
        console.log(response);
        if (response?.status === 403 || response?.status === 401) {
          navigate("/auth", { state: { from: location }, replace: true });
        }
        if (response?.status === 201) {
          console.log(response?.data?.workspaceName);
          setActiveWorkSpace(response?.data?.name);
          hide();
          navigate(`/user/${response?.data?.id}`, {
            state: { from: location },
          });
        }
      } catch (err) {
        if (err?.response?.status === 403 || err?.response?.status === 401) {
          navigate("/auth", { state: { from: location }, replace: true });
        }
        console.log(err.message);
        setErrMsg(err.message);
        setResMsg(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="CreateWorkspaceDialog">
      {resMsg ? <div className="resMsgFieldError">{resMsg}</div> : <></>}
      <h2>Create New Workspace</h2>
      <form onSubmit={handleSubmit} noValidate>
        <Input
          inputId="NewWorkspaceName"
          name="workspaceName"
          label="Name For Your New Workspace"
          type="text"
          required={true}
          errorMsg={errMsg}
        />
        <div className="CreateWorkspaceDialog__btnGrp">
          <MainButton
            className="mx-auto"
            disabled={loading}
            title={loading ? "In progress..." : "Create"}
            Icon={loading && <Spinner size={"20px"} stroke={"3px"} />}
          />
          <MainButton className="mx-auto" title="Cancel" onClick={hide} />
        </div>
      </form>
    </div>
  );
};

export default CreateWorkspace;
