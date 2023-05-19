import React, { useState } from "react";
//*css
import "./NewGroupDialog.scss";
import Input from "../../utilities/form/Input";
import MainButton from "../../utilities/MainButton/MainButton";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Spinner from "../../utilities/Spinner/Spinner";

const NewGroupDialog = ({ hide }) => {
  const [errMsg, setErrMsg] = useState("This field is required!");
  const [resMsg, setResMsg] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const axiosPrivate = useAxiosPrivate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.target.querySelectorAll("input").forEach((e) => {
      e.setAttribute("focused", true);
    });

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    if (data.NewGroupName) {
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
          hide();
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
