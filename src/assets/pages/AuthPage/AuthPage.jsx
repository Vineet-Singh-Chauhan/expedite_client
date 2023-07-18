import React, { useState, useEffect, lazy } from "react";
import useGoogleAuth from "./useGoogleAuth";
import useAuth from "../../../hooks/useAuth";

//*CSS*/
import "./AuthPage.scss";
//*image
import authImage from "../../images/authImg.png";
//*components*/
const LoginForm = lazy(() => import("../../components/LoginForm/LoginForm"));
const SignUpForm = lazy(() => import("../../components/SignUpForm/SignUpForm"));
const Spinner = lazy(() => import("../../utilities/Spinner/Spinner"));

const AuthPage = () => {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const { persist } = useAuth();
  const { loading, googleAuthError, handleGoogle, initializeGoogleAuth } =
    useGoogleAuth();

  // function to switch forms
  const handleFormChange = (e) => {
    e.preventDefault();
    setIsLoginPage(!isLoginPage);
  };

  //setting persist login
  useEffect(() => {
    localStorage.setItem("expeditePersist", persist);
  });

  // initializing google auth
  useEffect(() => {
    initializeGoogleAuth();
  }, [handleGoogle]);

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
        <div className="googleAuthContainer">
          {isLoginPage ? (
            <h3>
              Welcome back, Please login <br /> to your account
            </h3>
          ) : (
            <h3>
              Welcome to Expedite, Please Sign Up <br /> to start from now
            </h3>
          )}

          {/*to be populated by google auth */}
          <div id="GoogleSignUpBtn"></div>

          {loading ? (
            <Spinner size={"40px"} stroke={"4px"} />
          ) : googleAuthError ? (
            <div className="googleAuthError">{googleAuthError}</div>
          ) : (
            <></>
          )}
          <div className="orGroup">
            <hr />
            <span>or</span>
            <hr />
          </div>
        </div>
        <div className="formContent">
          {isLoginPage ? <LoginForm /> : <SignUpForm />}
        </div>
      </div>
      <div className="LoginPageimageSection">
        <img src={authImage} className="authImg" />
      </div>
    </div>
  );
};

export default AuthPage;
