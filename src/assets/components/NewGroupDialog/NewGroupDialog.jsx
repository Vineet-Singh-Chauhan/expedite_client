import React from "react";
//*css
import "./NewGroupDialog.scss";
import Input from "../../utilities/form/Input";
import MainButton from "../../utilities/MainButton/MainButton";

const handleSubmit = () => {};
const NewGroupDialog = ({ hide }) => {
  return (
    <div className="NewGroupDialog">
      <h2>Create New Group</h2>
      <form onSubmit={handleSubmit} noValidate>
        <Input
          inputId="newGroupInput"
          name="NewGroupName"
          label="Name of group"
          type="text"
          required={true}
        />
        <div className="NewGroupDialog__btnGrp">
          <MainButton className="mx-auto" title="Create" type="submit" />
          <MainButton className="mx-auto" title="Cancel" onClick={hide} />
        </div>
      </form>
    </div>
  );
};

export default NewGroupDialog;
