import React from "react";
//*CSS
import "./ForgotPasswordInput.scss";

//*Components
import Input from "../../utilities/form/Input";
import MainButton from "../../utilities/MainButton/MainButton";

const ForgotPasswordInput = () => {
  const handleSubmit = () => {};
  return (
    <div className="forgotPasswordInput">
      <div className="container forgotPasswordContent">
        <div className="logo">Expedite</div>
        <div>
          <p>
            Hello User, Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Excepturi, aspernatur.
          </p>
          <form onSubmit={handleSubmit} noValidate>
            <Input
              inputId="email"
              name="email"
              label="Email address"
              type="email"
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

export default ForgotPasswordInput;
