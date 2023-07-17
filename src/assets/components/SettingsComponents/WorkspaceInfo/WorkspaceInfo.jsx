import React, { lazy, useRef, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { useParams } from "react-router-dom";
import useWorkspace from "../../../../hooks/useWorkspace";
//*CSS
import "./WorkspaceInfo.scss";
//*components
const WorkspaceMembersTable = lazy(() =>
  import("../../MembersTable/WorkspaceMembersTable")
);
const Editable = lazy(() =>
  import("../../../utilities/EditableInput/EditableInput")
);

const WorkspaceInfo = () => {
  const inputRef = useRef();
  const params = useParams();
  const workspaceId = params.id;
  const axiosPrivate = useAxiosPrivate();
  const { activeWorkspace, setActiveWorkspace } = useWorkspace();
  const { user } = useAuth();
  const [isAdmin, setAdmin] = useState(() => {
    if (activeWorkspace?.admin._id === user._id) {
      return true;
    }
    return false;
  });
  console.log(activeWorkspace?.members);
  const handleChange = async (e) => {
    if (!e.target.value.trim()) return;
    try {
      setActiveWorkspace({
        ...activeWorkspace,
        [e.target.name]: e.target.value,
      });
      const response = await axiosPrivate.post("/api/updateworkspace", {
        [e.target.name]: e.target.value,
        workspaceId: workspaceId,
      });
      if (response?.status == 200) {
        console.log("done");
      }
    } catch (err) {
      console.log(err.message);
      alert(err.message);
    }
  };
  return (
    <div className="settings__workspaceInfo">
      <h2>Workspace Information</h2>
      <hr />

      <div>
        <div className="infoWrapper">
          <div className="infoTitle">Workspace Title</div>
          <div className="infoVal">
            <Editable
              text={activeWorkspace?.name}
              placeholder="Workspace Title"
              type="input"
              childRef={inputRef}
              noteditable={!isAdmin ? true : undefined}
            >
              <input
                className="settingInput"
                type="text"
                name="name"
                placeholder="Workspace Title"
                ref={inputRef}
                onBlur={handleChange}
              />
            </Editable>
          </div>
        </div>

        <div className="infoWrapper">
          <div className="infoTitle">Admin</div>
          <div className="infoVal">
            {/* TODO: Latter make admin editable */}

            <span>
              {activeWorkspace?.admin.firstName +
                " " +
                activeWorkspace?.admin.lastName}
            </span>
          </div>
        </div>

        <div className="infoWrapper">
          <div className="infoTitle">About</div>
          <div className="infoVal">
            <Editable
              text={activeWorkspace?.about}
              placeholder="About workspace.."
              type="input"
              childRef={inputRef}
              noteditable={!isAdmin ? true : undefined}
            >
              <textarea
                className="settingInput"
                type="text"
                name="about"
                placeholder="About workspace.."
                ref={inputRef}
                rows={5}
                onBlur={handleChange}
              />
            </Editable>
          </div>
        </div>
      </div>
      <WorkspaceMembersTable
        members={activeWorkspace?.members}
        invitees={activeWorkspace?.invitedMembers}
        isAdmin={isAdmin}
      />
    </div>
  );
};

export default WorkspaceInfo;
