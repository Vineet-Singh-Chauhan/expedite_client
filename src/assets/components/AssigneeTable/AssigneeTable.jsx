import React, { useState } from "react";

//*CSS
import "./AssigneeTable.scss";
//*icons
//*components
import Row from "./components/Row";

const AssigneeTable = ({ members, grpId, formData, setFormData }) => {
  async function RemoveMember(id, formData) {
    if (formData?.taskTitle) {
      try {
        //   console.log(grpId);
        const newAssignees = formData?.assignees.filter((e) => e.id != id);
        await setFormData({ ...formData, assignees: newAssignees });
        const response = await axiosPrivate.post("/api/createtask", {
          ...formData,
          grpId,
          workspaceId: params.id,
        });
        console.log(response.message);
      } catch (err) {
        console.log(err.message);
      }
    }
  }
  return (
    <div className="AssigneeTable">
      <div className="workspaceSettings__userlist">
        <div className="flex userListHead">
          <h2>Assignees </h2>
        </div>
        <hr />
        {members?.length === 0 ? (
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
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {members?.map((member, i) => (
                    <Row
                      name={member.name}
                      sno={i + 1}
                      action="Remove"
                      email={member.email}
                      id={member.id}
                      key={i}
                      onClick={() => {
                        RemoveMember(member.id, formData);
                      }}
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

export default AssigneeTable;
