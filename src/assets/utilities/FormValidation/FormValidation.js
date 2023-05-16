import { nameregex, emailregex, phoneregex, passwordRegex } from "./regex";
const validate = async (params, formValues) => {
  if (params.value === "" && params.required) {
    params.scrollIntoView();
    return "This field cannot be empty!";
  } else if (params.name === "firstName" || params.name === "lastName") {
    if (!nameregex.test(params.value)) {
      params.setCustomValidity("This field can only contain alphabets");
      params.scrollIntoView();
      return `${params.placeholder} can only contain alphabets !`;
    }
  } else if (params.type === "email") {
    if (!emailregex.test(params.value)) {
      params.setCustomValidity("Enter a valid email address");
      params.scrollIntoView();
      return `This doesn't appear to be a valid email address`;
    }
  } else if (
    (params.name === "phone" || params.name === "mobile") &&
    params.value !== ""
  ) {
    if (!phoneregex.test(params.value)) {
      params.setCustomValidity("Enter a valid mobile number");
      params.scrollIntoView();
      return `This doesn't appear to be a valid mobile number`;
    }
  } else if (params.name === "password" || params.name === "newPassword") {
    if (!passwordRegex.test(params.value)) {
      params.setCustomValidity(
        "Password must contain atleast  one lowercase, one digit and one special character. Length of password should be 7 to 19 characters."
      );
      params.scrollIntoView();
      return `Password must contain atleast  one alphabet, one digit and one special character (must not appear at start). Length of password should be 7 to 19 characters.`;
    }
  } else if (params.name === "confirmPassword") {
    if (!formValues.password.match(params.value)) {
      params.setCustomValidity("Passwords do not match!");
      params.scrollIntoView();
      return `Passwords do not match!`;
    }
  } else if (params.name === "dob") {
    let ToDate = new Date();
    if (new Date(params.value).getTime() > ToDate.getTime()) {
      params.setCustomValidity("Please enter a valid date of birth");
      return "Please enter a valid date of birth";
    }
  } else if (params.name === "confirmNewPassword") {
    if (!(formValues.newPassword === params.value)) {
      params.setCustomValidity("Passwords do not match!");
      params.scrollIntoView();
      return `Passwords do not match!`;
    }
  }
  params.setCustomValidity("");
  return false;
};
export default validate;
