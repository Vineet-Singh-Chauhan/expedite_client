import React from "react";

//*CSS
import "./ChangePassword.scss";
//*Components
import PasswordInput from "../../../utilities/form/PasswordInput";
import MainButton from "../../../utilities/MainButton/MainButton";

const ChangePassword = () => {
  const handleSubmit = () => {};
  return (
    <div className="ChangePasswordModal">
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit} noValidate>
        <PasswordInput
          inputId="currPassword"
          name="currPassword"
          label="Enter Current Password"
          type="password"
          required={true}
        />
        <PasswordInput
          inputId="newPassword"
          name="newPassword"
          label="Enter New Password"
          type="password"
          required={true}
        />
        <PasswordInput
          inputId="confirmPassword"
          name="confirm password"
          label="Confirm Password"
          type="password"
          required={true}
        />
        <MainButton className="mx-auto" title="Reset Password" type="submit" />
      </form>
    </div>
  );
};

export default ChangePassword;
