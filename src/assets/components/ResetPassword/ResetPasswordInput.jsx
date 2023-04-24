import React from "react";
//* CSS
import "./ResetPasswordInput.scss";

//*Components
import PasswordInput from "../../utilities/form/PasswordInput";
import MainButton from "../../utilities/MainButton/MainButton";

const ResetPasswordInput = ({ user }) => {
  const handleSubmit = () => {};
  return (
    <div className="ResetPasswordInput">
      <div className="resetpasswordContent">
        <div className="logo">Expedite</div>
        <div>
          <p>
            Hello {user}, Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Excepturi, aspernatur.
          </p>
          <form onSubmit={handleSubmit} noValidate>
            <PasswordInput
              inputId="newPassword"
              name="new password"
              label="New Password"
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
            <MainButton
              className="mx-auto"
              title="Reset Password"
              type="submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordInput;
