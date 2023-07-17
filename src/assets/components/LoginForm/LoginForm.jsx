import React, { lazy, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

//*CSS
import "./LoginForm.scss";

//* Components
const PasswordInput = lazy(() => import("../../utilities/form/PasswordInput"));
const Input = lazy(() => import("../../utilities/form/Input"));
const MainButton = lazy(() => import("../../utilities/MainButton/MainButton"));
const Spinner = lazy(() => import("../../utilities/Spinner/Spinner"));
import { emailregex } from "../../utilities/FormValidation/regex";

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [resMsg, setResMsg] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const { setAuth, persist, setPersist } = useAuth();
  const from = location.state?.from?.pathname || "/";

  const [formErrors, setFormErrors] = useState({
    email: "This field cannot be empty!",
    password: "This field cannot be empty!",
  });

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

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
    e.target.setCustomValidity("");
    validateLoginFields(e.target).then((result) => {
      setFormErrors({ ...formErrors, [e.target.name]: result });
      if (result) e.target.setCustomValidity(result);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fields = e.target.querySelectorAll("input");
    for (const e of fields) {
      e.setCustomValidity("");
    }
    for (const e of fields) {
      e.setAttribute("focused", true);
      validateLoginFields(e).then((result) => {
        setFormErrors({ ...formErrors, [e.name]: result });
        if (result) e.setCustomValidity(result);
      });
    }
    let isValid = true;
    for (let key in formErrors) {
      if (formErrors[key] !== false) {
        isValid = false;
        return;
      }
    }

    if (isValid) {
      const data = new FormData(e.target);
      const formValues = Object.fromEntries(data.entries());
      setLoading(true);
      await axiosPrivate
        .post(`/api/signin`, formValues)
        .then((res) => {
          const data = res?.data;
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
  };

  return (
    <div className="loginForm">
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
