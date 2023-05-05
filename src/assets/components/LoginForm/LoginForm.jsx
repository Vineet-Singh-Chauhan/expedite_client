import React, { useEffect, useState } from "react";
//*CSS
import "./LoginForm.scss";
//* Components
import PasswordInput from "../../utilities/form/PasswordInput";
import Input from "../../utilities/form/Input";
import MainButton from "../../utilities/MainButton/MainButton";
import { emailregex } from "../../utilities/FormValidation/regex";
import { Link, useLocation, useNavigate } from "react-router-dom";
import postData from "../../utilities/PostFunctions/postData";
import Spinner from "../../utilities/Spinner/Spinner";
import useAuth from "../../../hooks/useAuth";

//* Icons
import { FcGoogle } from "react-icons/fc";

const LoginForm = () => {
  const { setAuth, persist, setPersist } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [loading, setLoading] = useState(false);
  const [resMsg, setResMsg] = useState("");

  const [formErrors, setFormErrors] = useState({
    email: "This field cannot be empty!",
    password: "This field cannot be empty!",
  });
  const togglePersist = () => {
    setPersist((prev) => !prev);
  };
  useEffect(() => {
    localStorage.setItem("expeditePersist", persist);
  });
  const validateLoginFields = async (params) => {
    if (params.value === "") {
      return "This field cannot be empty!";
    } else if (params.type === "email") {
      if (!emailregex.test(params.value)) {
        return "This does not appear to be valid email address";
      }
    }
    return false;
  };
  const handleChange = (e) => {
    validateLoginFields(e.target).then((result) => {
      setFormErrors({ ...formErrors, [e.target.name]: result });
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.querySelectorAll("input").forEach((e) => {
      e.setAttribute("focused", true);
      validateLoginFields(e);
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
          const data = new FormData(e.target);
          const formValues = Object.fromEntries(data.entries());
          console.log(formValues);
          setLoading(true);
          postData(`${import.meta.env.VITE_BASE_URL}/api/signin`, formValues)
            .then((data) => {
              console.log(data);
              if (data.error) {
                setLoading(false);
                setResMsg(data.error);
                return;
              }
              setAuth({ accessToken: data.accessToken });
              setResMsg("");
              setLoading(false);
              navigate(from, { replace: true });
            })
            .catch((error) => {
              console.log("from catch", error);
              setResMsg(error.message);
              setLoading(false);
            });
        }
      }, 0);
    }, 0);
  };

  return (
    <div className="loginForm">
      {/* <MainButton
        title="Login with Google"
        Icon={<FcGoogle />}
        // onClick={handleGoogleLogin}
      /> */}

      <form onSubmit={handleSubmit} noValidate>
        {resMsg ? <div className="resMsgFieldError">{resMsg}</div> : <></>}
        <Input
          inputId="email"
          name="email"
          label="Email address"
          type="email"
          required={true}
          errorMsg={formErrors.email}
          onChange={handleChange}
        />
        <PasswordInput
          inputId="password"
          name="password"
          label="Password"
          type="password"
          required={true}
          errorMsg={formErrors.password}
          onChange={handleChange}
        />

        <div className="loginFormOptions">
          <div className="rememberMeDiv">
            <input
              type="checkbox"
              name="remember me"
              id="rememberMe"
              onChange={togglePersist}
              checked={persist}
            />
            <label htmlFor="rememberMe">Remember Me</label>
          </div>
          <div className="forgotPasswordDiv">
            <a href="/forgotPassword">Forgot your password?</a>
          </div>
        </div>
        <div className="loginButton">
          <MainButton
            type="submit"
            disabled={loading}
            title={loading ? "Logging in..." : "Login"}
            Icon={loading && <Spinner size={"20px"} stroke={"3px"} />}
          />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
