import React, { lazy, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useTask from "../../../hooks/useTask";
import useSocket from "../../../hooks/useSocket";
import useAuth from "../../../hooks/useAuth";
import useWorkspace from "../../../hooks/useWorkspace";
//*css
import "./NewGroupDialog.scss";
//*Components
const Input = lazy(() => import("../../utilities/form/Input"));
const MainButton = lazy(() => import("../../utilities/MainButton/MainButton"));
const Spinner = lazy(() => import("../../utilities/Spinner/Spinner"));

const NewGroupDialog = ({ hide }) => {
  const [errMsg, setErrMsg] = useState("This field is required!");
  const [resMsg, setResMsg] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const { setList } = useTask();
  const axiosPrivate = useAxiosPrivate();
  const { socket } = useSocket();
  const { user } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.target.querySelectorAll("input").forEach((e) => {
      e.setAttribute("focused", true);
    });

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    if (data.NewGroupName.trim()) {
      try {
        setLoading(true);
        const response = await axiosPrivate.post("/api/createtaskgrp", {
          grpName: data.NewGroupName,
          workspaceId: params.id,
        });
        console.log(response.data);
        if (response?.status === 403 || response?.status === 401) {
          navigate("/auth", { state: { from: location }, replace: true });
        }
        if (response?.status === 201) {
          socket.emit("changeEmitted", {
            workspaceId: params.id,
            sender: user._id,
          });
          hide();
        }

        setList((oldList) => {
          return [...oldList, response.data];
        });
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
    try {
    } catch (err) {
      console.log(err?.response?.message);
    }
  };
  return (
    <div className="NewGroupDialog">
      {resMsg ? <div className="resMsgFieldError">{resMsg}</div> : <></>}
      <h2>Create New Group</h2>
      <form onSubmit={handleSubmit} noValidate>
        <Input
          inputId="newGroupInput"
          name="NewGroupName"
          label="Name of group"
          type="text"
          required={true}
          errorMsg={errMsg}
        />
        <div className="NewGroupDialog__btnGrp">
          <MainButton
            className="mx-auto"
            disabled={loading}
            title={loading ? "In progress..." : "Create"}
            Icon={loading && <Spinner size={"20px"} stroke={"3px"} />}
            type="submit"
          />
          <MainButton className="mx-auto" title="Cancel" onClick={hide} />
        </div>
      </form>
    </div>
  );
};

export default NewGroupDialog;
