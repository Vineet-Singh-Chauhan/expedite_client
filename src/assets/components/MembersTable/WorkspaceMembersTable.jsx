import React, { lazy } from "react";
import useModal from "../../utilities/Modal/useModal";
import useAuth from "../../../hooks/useAuth";

//*CSS
import "./WorkspaceMembersTable.scss";
//*icons
import { AiOutlinePlus } from "react-icons/ai";
//*components
const Row = lazy(() => import("./components/Row"));
const Modal = lazy(() => import("../../utilities/Modal/Modal"));
const AddMember = lazy(() =>
  import("../SettingsComponents/AddMember/AddMember")
);
const Row2 = lazy(() => import("./components/Row2"));

const WorkspaceMembersTable = ({ members, invitees, isAdmin }) => {
  const { isShowing, toggle } = useModal();
  return (
    <div className="WorkspaceMembersTable">
      <div className="workspaceSettings__userlist">
        <div className="flex userListHead">
          <h2>Members </h2>
          {isAdmin && (
            <button className="userListHead__button" onClick={toggle}>
              <AiOutlinePlus /> Add
            </button>
          )}

          <Modal isShowing={isShowing} hide={toggle} Content={<AddMember />} />
        </div>

        <hr />
        {members.length === 0 ? (
          <div className="EmptyRow">Nothing to show</div>
        ) : (
          <>
            {" "}
            <div className="userlistTableContainer">
              <table className="userListTable">
                <thead>
                  <tr>
                    <th>S No.</th>
                    <th>Name</th>
                    <th>Email</th>
                    {isAdmin && <th>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {members?.map((member, i) => (
                    <Row
                      name={member.firstName + " " + member.lastName}
                      sno={i + 1}
                      action="Remove"
                      email={member.email}
                      id={member._id}
                      key={i}
                      isAdmin={isAdmin}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
      <div className="workspaceSettings__userlist">
        <div className="flex userListHead">
          <h2>Invitees </h2>
        </div>

        <hr />

        {invitees.length === 0 ? (
          <div className="EmptyRow">Nothing to show</div>
        ) : (
          <>
            <div className="userlistTableContainer">
              <table className="userListTable">
                <thead>
                  <tr>
                    <th>S No.</th>
                    <th>Email</th>
                    {isAdmin && <th>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {invitees?.map((member, i) => (
                    <Row2
                      // name={member}
                      sno={i + 1}
                      action="Cancel"
                      email={member}
                      // id={member.id}
                      key={i}
                      isAdmin={isAdmin}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WorkspaceMembersTable;
