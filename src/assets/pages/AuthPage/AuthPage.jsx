import React, { useState, useEffect } from "react";

//*CSS*/
import "./AuthPage.scss";

//*components*/
import LoginForm from "../../components/LoginForm/LoginForm";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import Spinner from "../../utilities/Spinner/Spinner";
import useFetch from "./useFetch";

const AuthPage = () => {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const { loading, googleAuthError, handleGoogle } = useFetch(
    `${import.meta.env.VITE_BASE_URL}/api/google-auth`
  );
  const handleFormChange = (e) => {
    e.preventDefault();
    setIsLoginPage(!isLoginPage);
  };
  const initializeGoogleAuth = () => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleGoogle,
      });

      google.accounts.id.renderButton(
        document.getElementById("GoogleSignUpBtn"),
        {
          theme: "outline",
          size: "large",
          text: "signup_with",
          shape: "rectangular",
        }
      );

      google.accounts.id.prompt();
    }
  };

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

          {/* //*to be populated by google auth */}
          <div id="GoogleSignUpBtn" disabled={loading}></div>

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
      <div className="LoginPageimageSection"></div>
    </div>
  );
};

export default AuthPage;
