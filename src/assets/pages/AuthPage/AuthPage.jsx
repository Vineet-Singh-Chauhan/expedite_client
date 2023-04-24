import React, { useState } from "react";

//*CSS*/
import "./AuthPage.scss";

//*components*/
import LoginForm from "../../components/LoginForm/LoginForm";
import SignUpForm from "../../components/SignUpForm/SignUpForm";

const AuthPage = () => {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const handleFormChange = (e) => {
    e.preventDefault();
    setIsLoginPage(!isLoginPage);
  };

  return (
    <div className="authPage container">
      <div className="formContainer">
        <div className="formContainer__header">
          <span className="logo">Expedite</span>
          <span className="formToggleLink" onClick={handleFormChange}>
            {isLoginPage
              ? "Don't have an account ?"
              : "Already have an account ?"}
          </span>
        </div>
        <div className="formContent">
          {isLoginPage ? <LoginForm /> : <SignUpForm />}
        </div>
      </div>
      <div className="LoginPageimageSection"></div>
    </div>
  );
};

export default AuthPage;
