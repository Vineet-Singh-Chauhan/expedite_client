import React, { useRef } from "react";
//*CSS
import "./WorkspaceInfo.scss";
//*components
import Editable from "../../../utilities/EditableInput/EditableInput";
import WorkspaceMembersTable from "../../MembersTable/WorkspaceMembersTable";

const WorkspaceInfo = () => {
  const inputRef = useRef();
  return (
    <div className="settings__workspaceInfo">
      <h2>Workspace Information</h2>
      <hr />

      <div>
        <div className="infoWrapper">
          <div className="infoTitle">Workspace Title</div>
          <div className="infoVal">
            <Editable
              text={"Test"}
              placeholder="First Name"
              type="input"
              childRef={inputRef}
            >
              <input
                className="settingInput"
                type="text"
                name="firstName"
                placeholder="First Name"
                ref={inputRef}
              />
            </Editable>
          </div>
        </div>

        <div className="infoWrapper">
          <div className="infoTitle">Admin</div>
          <div className="infoVal">
            <Editable
              text={"Vineet Singh Chauhan"}
              placeholder="First Name"
              type="input"
              childRef={inputRef}
            >
              <input
                className="settingInput"
                type="text"
                name="firstName"
                placeholder="First Name"
                ref={inputRef}
              />
            </Editable>
          </div>
        </div>

        <div className="infoWrapper">
          <div className="infoTitle">About</div>
          <div className="infoVal">
            <Editable
              text={"About workspace.."}
              placeholder="First Name"
              type="input"
              childRef={inputRef}
            >
              <textarea
                className="settingInput"
                type="text"
                name="firstName"
                placeholder="First Name"
                ref={inputRef}
                rows={5}
              />
            </Editable>
          </div>
        </div>
      </div>
      <WorkspaceMembersTable />
    </div>
  );
};

export default WorkspaceInfo;
