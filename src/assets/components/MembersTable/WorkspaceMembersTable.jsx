import React from "react";

//*CSS
import "./WorkspaceMembersTable.scss";
//*icons
import { AiOutlinePlus } from "react-icons/ai";
//*components
import Row from "./components/Row";
import Modal from "../../utilities/Modal/Modal";
import useModal from "../../utilities/Modal/useModal";
import AddMember from "../SettingsComponents/AddMember/AddMember";

const WorkspaceMembersTable = () => {
  const handleAddMember = () => {};
  const { isShowing, toggle } = useModal();
  return (
    <div className="WorkspaceMembersTable">
      <div className="workspaceSettings__userlist">
        <div className="flex userListHead">
          <h2>Members </h2>
          <button className="userListHead__button" onClick={toggle}>
            <AiOutlinePlus /> Add
          </button>
          <Modal isShowing={isShowing} hide={toggle} Content={<AddMember />} />
        </div>

        <hr />

        <div className="userlistTableContainer">
          <table className="userListTable">
            <thead>
              <tr>
                <th>S No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <Row
                name="Vineet"
                sno={1}
                action="Remove"
                email="vineetksc@gmail.com"
              />
              <Row
                name="Shyam"
                sno={2}
                action="Remove"
                email="shyam@gmail.com"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceMembersTable;
