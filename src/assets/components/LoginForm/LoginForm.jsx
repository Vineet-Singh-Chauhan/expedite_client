import React from "react";
//*CSS
import "./LoginForm.scss";

//* Components
import PasswordInput from "../../utilities/form/PasswordInput";
import Input from "../../utilities/form/Input";
import MainButton from "../../utilities/MainButton/MainButton";

//* Icons
import { FcGoogle } from "react-icons/fc";

const LoginForm = () => {
  const handleGoogleLogin = () => {
    console.log("login");
  };
  const handleSubmit = () => {};
  return (
    <div className="loginForm">
      <h3>
        Welcome back, Please login <br /> to your account
      </h3>
      <MainButton
        title="Login with Google"
        Icon={<FcGoogle />}
        onClick={handleGoogleLogin}
      />
      <div className="orGroup">
        <hr />
        <span>or</span>
        <hr />
      </div>
      <form onSubmit={handleSubmit} noValidate>
        <Input
          inputId="email"
          name="email address"
          label="Email address"
          type="email"
          required={true}
        />
        <PasswordInput
          inputId="password"
          name="password"
          label="Password"
          type="password"
          required={true}
        />

        <div className="loginFormOptions">
          <div className="rememberMeDiv">
            <input type="checkbox" name="remember me" id="rememberMe" />
            <label htmlFor="rememberMe">Remember Me</label>
          </div>
          <div className="forgotPasswordDiv">
            <a href="/forgotPassword">Forgot your password?</a>
          </div>
        </div>
        <div className="loginButton">
          <MainButton type="submit" title="Login" onClick={handleSubmit} />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
