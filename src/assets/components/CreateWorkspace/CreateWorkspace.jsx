import React, { lazy, useContext, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
//*css
import "./CreateWorkspace.scss";
//*components
const Input = lazy(() => import("../../utilities/form/Input"));
const MainButton = lazy(() => import("../../utilities/MainButton/MainButton"));
const Spinner = lazy(() => import("../../utilities/Spinner/Spinner"));

const CreateWorkspace = ({ hide }) => {
  const [errMsg, setErrMsg] = useState("This field is required!");
  const [resMsg, setResMsg] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
  const { setUser } = useAuth();
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
        if (response?.status === 403 || response?.status === 401) {
          navigate("/auth", { state: { from: location }, replace: true });
        }
        if (response?.status === 201) {
          setUser((user) => {
            user.workspaces = [
              ...user.workspaces,
              {
                _id: response?.data?.id,
                name: response?.data?.name,
              },
            ];
            return { ...user };
          });
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
