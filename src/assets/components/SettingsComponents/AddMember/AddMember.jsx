import React from "react";
//*css
import "./AddMember.scss";
//*Components
import Input from "../../../utilities/form/Input";
import MainButton from "../../../utilities/MainButton/MainButton";
const AddMember = () => {
  const handleSubmit = () => {};

  return (
    <div className="AddMemberModal">
      <h2>Add members</h2>
      <form onSubmit={handleSubmit} noValidate>
        <Input
          inputId="email"
          name="email"
          label="Email address"
          type="email"
          required={true}
        />
        <MainButton className="mx-auto" title="Invite" type="submit" />
      </form>
    </div>
  );
};

export default AddMember;
