import React, { useState } from "react";
//*css
import "./AddMember.scss";
//*Components
import Input from "../../../utilities/form/Input";
import MainButton from "../../../utilities/MainButton/MainButton";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { emailregex } from "../../../utilities/FormValidation/regex";
import Spinner from "../../../utilities/Spinner/Spinner";
const AddMember = () => {
  const [resMsg, setResMsg] = useState();
  const [loading, setLoading] = useState(false);
  const [succesMsg, setSuccessMsg] = useState();
  const [errMsg, setErrMsg] = useState("This field is required!");
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const workspaceId = params.id;
  const axiosPrivate = useAxiosPrivate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg();
    setResMsg();
    e.target.querySelectorAll("input").forEach((e) => {
      e.setAttribute("focused", true);
    });
    const formData = new FormData(e.target);

    const data = Object.fromEntries(formData.entries());
    const email = data?.email;

    try {
      setLoading(true);
      if (emailregex.test(email)) {
        const response = await axiosPrivate.post("/api/addmember", {
          email: email,
          workspaceId,
        });
        console.log(response);
        if (response?.status === 403 || response?.status === 401) {
          navigate("/auth", { state: { from: location }, replace: true });
        }
        if (response?.status === 204) {
          console.log(response?.data);
          setSuccessMsg("Invitation sent !");
          // hide();
        }
      } else {
        setErrMsg("Invalid email address!");
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
    <div className="AddMemberModal">
      {resMsg ? <div className="resMsgFieldError">{resMsg}</div> : <></>}
      {succesMsg ? <div className="successMsgField">{succesMsg}</div> : <></>}
      <h2>Add members</h2>
      <form onSubmit={handleSubmit} noValidate>
        <Input
          inputId="email"
          name="email"
          label="Email address"
          type="email"
          required={true}
          errorMsg={errMsg}
        />
        <MainButton
          className="mx-auto"
          type="submit"
          disabled={loading}
          title={loading ? "In progress..." : "Invite"}
          Icon={loading && <Spinner size={"20px"} stroke={"3px"} />}
        />
      </form>
    </div>
  );
};

export default AddMember;
