import React, { useState } from "react";

//*CSS
import "./ChangePassword.scss";
//*Components
import PasswordInput from "../../../utilities/form/PasswordInput";
import MainButton from "../../../utilities/MainButton/MainButton";
import validate from "../../../utilities/FormValidation/FormValidation";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import Spinner from "../../../utilities/Spinner/Spinner";

const ChangePassword = () => {
  const [resMsg, setResMsg] = useState(undefined);
  const [succesMsg, setSuccessMsg] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const [formErrors, setFormErrors] = useState({
    currPassword: "This field is mandatory!",
    newPassword: "This field is mandatory!",
    confirmNewPassword: "Passwords do not match!",
  });
  const [formValues, setFormValues] = useState({
    currPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.querySelectorAll("input").forEach((e) => {
      e.setAttribute("focused", true);
      validate(e, formValues);
    });

    setTimeout(() => {
      let isValid = true;
      for (let key in formErrors) {
        if (formErrors[key] !== false) {
          isValid = false;
          return;
        }
      }

      setTimeout(() => {
        if (isValid) {
          setLoading(true);
          const submit = async () => {
            try {
              const response = await axiosPrivate.post(
                "/api/updateuser",
                formValues
              );
              console.log(response);
              if (response.data.error) {
                setResMsg(response.data.error);
              }
              if (response?.status === 200) {
                setResMsg("");
                setSuccessMsg("Password updated successfully!");
              }
            } catch (err) {
              console.log("from catch", err);
              setResMsg(err.response.data?.error);
            } finally {
              setLoading(false);
            }
          };
          submit();
        }
      }, 0);
    }, 0);
  };
  const handleChange = (e) => {
    validate(e.target, formValues).then((result) => {
      setFormErrors({ ...formErrors, [e.target.name]: result });
      if (!result) {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
      }
    });
  };
  return (
    <div className="ChangePasswordModal">
      {resMsg ? <div className="resMsgFieldError">{resMsg}</div> : <></>}
      {succesMsg ? <div className="successMsgField">{succesMsg}</div> : <></>}
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit} noValidate>
        <PasswordInput
          inputId="currPassword"
          name="currPassword"
          label="Enter Current Password"
          type="password"
          required={true}
          onChange={handleChange}
          errorMsg={formErrors?.currPassword}
        />
        <PasswordInput
          inputId="newPassword"
          name="newPassword"
          label="Enter New Password"
          type="password"
          required={true}
          onChange={handleChange}
          errorMsg={formErrors?.newPassword}
        />
        <PasswordInput
          inputId="confirmPassword"
          name="confirmNewPassword"
          label="Confirm Password"
          type="password"
          required={true}
          onChange={handleChange}
          errorMsg={formErrors?.confirmNewPassword}
          pattern={formValues.newPassword}
        />
        <MainButton
          className="mx-auto"
          type="submit"
          disabled={loading}
          title={loading ? "In progress..." : "Reset Password"}
          Icon={loading && <Spinner size={"20px"} stroke={"3px"} />}
        />
      </form>
    </div>
  );
};

export default ChangePassword;
