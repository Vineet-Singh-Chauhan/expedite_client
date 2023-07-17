import React, { lazy } from "react";

//*Components
const ForgotPasswordInput = lazy(() =>
  import("../../components/ForgotPassword/ForgotPasswordInput")
);

const ForgotPassword = () => {
  return (
    <div>
      <ForgotPasswordInput />
    </div>
  );
};

export default ForgotPassword;
