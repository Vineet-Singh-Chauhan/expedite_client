import React from "react";
//*css
import "./CreateWorkspace.scss";
import Input from "../../utilities/form/Input";
import MainButton from "../../utilities/MainButton/MainButton";

const handleSubmit = () => {};
const handleCreateWorkspace = () => {};
const CreateWorkspace = ({ hide }) => {
  return (
    <div className="CreateWorkspaceDialog">
      <h2>Create New Workspace</h2>
      <form onSubmit={handleSubmit} noValidate>
        <Input
          inputId="NewWorkspaceName"
          name="NewWorkspaceName"
          label="Name For Your New Workspace"
          type="text"
          required={true}
        />
        <div className="CreateWorkspaceDialog__btnGrp">
          <MainButton
            className="mx-auto"
            title="Create"
            onClick={handleCreateWorkspace}
          />
          <MainButton className="mx-auto" title="Cancel" onClick={hide} />
        </div>
      </form>
    </div>
  );
};

export default CreateWorkspace;
