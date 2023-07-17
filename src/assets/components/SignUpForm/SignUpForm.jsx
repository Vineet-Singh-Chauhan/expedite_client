import React, { lazy, useState } from "react";
import useLoadingScreen from "../LoadingScreen/useLoadingScreen";
import axios from "../../../api/axios";

//* CSS
import "./SignUpForm.scss";

//*Components
const PasswordInput = lazy(() => import("../../utilities/form/PasswordInput"));
const Input = lazy(() => import("../../utilities/form/Input"));
const MainButton = lazy(() => import("../../utilities/MainButton/MainButton"));
const Spinner = lazy(() => import("../../utilities/Spinner/Spinner"));
const LoadingScreen = lazy(() => import("../LoadingScreen/LoadingScreen"));

import validate from "../../utilities/FormValidation/FormValidation";

const SignUpForm = () => {
  const { status, setLoadingStatus } = useLoadingScreen();
  const [resMsg, setResMsg] = useState(undefined);

  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({
    firstName: "This field cannot be empty!",
    lastName: "This field cannot be empty!",
    gender: "",
    dob: "",
    email: "This field cannot be empty!",
    phone: false,
    password: "This field cannot be empty!",
    confirmPassword: "Passwords do not match!",
  });

  const handleChange = (e) => {
    validate(e.target, formValues).then((result) => {
      setFormErrors({ ...formErrors, [e.target.name]: result });
      if (!result) {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fields = e.target.querySelectorAll("input");
    for (const e of fields) {
      e.setAttribute("focused", true);
      validate(e, formValues);
    }
    if (formValues.gender === "") {
      setFormErrors({ ...formErrors, gender: "This field cannot be blank!" });
      return;
    }
    if (formValues.dob === "") {
      setFormErrors({ ...formErrors, dob: "This field cannot be blank!" });
      return;
    }
    console.log(formErrors);

    let isValid = true;
    for (let key in formErrors) {
      if (formErrors[key] !== false) {
        isValid = false;
        return;
      }
    }
    if (isValid) {
      setLoadingStatus(true);

      await axios
        .post(`/api/signup`, formValues)
        .then((res) => {
          const data = res?.data;
          console.log(data);
          if (data.error) {
            setLoadingStatus("error");
            setResMsg(data.error.message);
            return;
          }
          setResMsg(data.message);
          setLoadingStatus("success");
        })
        .catch((error) => {
          console.log("from catch", error);
          setResMsg(error?.response?.data?.error.message || error?.message);
          setLoadingStatus("error");
        });
    }
  };

  return (
    <>
      <LoadingScreen
        status={status}
        msg={resMsg}
        hide={() => {
          setLoadingStatus(false);
        }}
      />
      <div className="SignupForm">
        <form onSubmit={handleSubmit} noValidate>
          <div className="flex nameGrp">
            <Input
              inputId="firstName"
              name="firstName"
              label="First Name"
              type="text"
              required={true}
              onChange={handleChange}
              errorMsg={formErrors?.firstName}
            />
            <Input
              inputId="lname"
              name="lastName"
              label="Last Name"
              type="text"
              required={true}
              onChange={handleChange}
              errorMsg={formErrors?.lastName}
            />
          </div>
          <div className="genderContainer">
            <p>
              Gender<span className="requiredAsterik">*</span> : &nbsp;
              {formErrors?.gender && (
                <span className="errorField">{formErrors?.gender}</span>
              )}
            </p>

            <div className="flex">
              <label className="genderLabel" htmlFor="male">
                👨‍🦱Male
                <input
                  type="radio"
                  value="male"
                  name="gender"
                  id="male"
                  onChange={handleChange}
                />
              </label>
              <label className="genderLabel" htmlFor="female">
                🙍‍♀️Female
                <input
                  type="radio"
                  value="female"
                  name="gender"
                  id="female"
                  onChange={handleChange}
                />
              </label>
              <label className="genderLabel" htmlFor="notSaid">
                <input
                  type="radio"
                  value="not said"
                  name="gender"
                  id="notSaid"
                  onChange={handleChange}
                />
                Prefer not to say
              </label>
            </div>
          </div>
          <div className="dobContainer">
            <p>
              Date of birth<span className="requiredAsterik">*</span> :
            </p>

            <input
              name="dob"
              type="date"
              placeholder="date"
              onChange={handleChange}
            />
            {formErrors?.dob && (
              <span className="errorField">{formErrors?.dob}</span>
            )}
          </div>
          <Input
            inputId="email"
            name="email"
            label="Email address"
            type="email"
            required={true}
            onChange={handleChange}
            errorMsg={formErrors?.email}
          />

          <Input
            inputId="phone"
            name="phone"
            label="Phone Number"
            type="number"
            // required={true}
            onChange={handleChange}
            errorMsg={formErrors?.phone}
          />
          <PasswordInput
            inputId="password"
            name="password"
            label="Password"
            type="password"
            required={true}
            onChange={handleChange}
            errorMsg={formErrors?.password}
          />
          <PasswordInput
            inputId="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            required={true}
            onChange={handleChange}
            errorMsg={formErrors?.confirmPassword}
            pattern={formValues.password}
          />
          <div className="signUpButton">
            <MainButton
              type="submit"
              title={status === true ? "Signing up .." : "Sign Up"}
              Icon={status === true ? <Spinner /> : <></>}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUpForm;
