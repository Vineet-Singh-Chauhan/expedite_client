import React from "react";
//* CSS
import "./SignUpForm.scss";
//*Components
import PasswordInput from "../../utilities/form/PasswordInput";
import Input from "../../utilities/form/Input";
import MainButton from "../../utilities/MainButton/MainButton";
//*Icons
import { FcGoogle } from "react-icons/fc";

const SignUpForm = () => {
  const handleGoogleSignUp = () => {};
  const handleSubmit = () => {};
  return (
    <div className="SignupForm">
      <h3>
        Welcome to Expedite, Please Sign Up <br /> to start from now
      </h3>
      <MainButton
        title="Sign up with Google"
        Icon={<FcGoogle />}
        onClick={handleGoogleSignUp}
      />
      <div className="orGroup">
        <hr />
        <span>or</span>
        <hr />
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="flex">
          <Input
            inputId="fname"
            name="First Name"
            label="First Name"
            type="text"
            required={true}
          />
          <Input
            inputId="lname"
            name="Last Name"
            label="Last Name"
            type="text"
            required={true}
          />
        </div>
        <div className="genderContainer">
          <p>Gender:</p>
          <div className="flex">
            <label className="genderLabel" htmlFor="male">
              👨‍🦱Male
              <input type="radio" value="male" name="gender" id="male" />
            </label>
            <label className="genderLabel" htmlFor="female">
              🙍‍♀️Female
              <input type="radio" value="female" name="gender" id="female" />
            </label>
            <label className="genderLabel" htmlFor="notSaid">
              <input type="radio" value="not said" name="gender" id="notSaid" />
              Prefer not to say
            </label>
          </div>
        </div>
        <div className="dobContainer">
          <p>Date of birth:</p>
          <input type="date" placeholder="date" />
        </div>
        <Input
          inputId="email"
          name="Email address"
          label="Email address"
          type="email"
          required={true}
        />

        <Input
          inputId="phone"
          name="Phone Number"
          label="Phone Number"
          type="Number"
          required={true}
        />
        <PasswordInput
          inputId="password"
          name="password"
          label="Password"
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
        <div className="signUpButton">
          <MainButton type="submit" title="Sign Up" onClick={handleSubmit} />
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
