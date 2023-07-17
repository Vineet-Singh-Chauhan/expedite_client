import React, { lazy } from "react";

//*CSS
import "./AssigneeTable.scss";
//*components
const Row = lazy(() => import("./components/Row"));

const AssigneeTable = ({ members, grpId, formData, setFormData }) => {
  async function RemoveMember(id, formData) {
    if (formData?.taskTitle) {
      try {
        const newAssignees = formData?.assignees.filter((e) => e._id != id);
        await setFormData({ ...formData, assignees: newAssignees });
        const response = await axiosPrivate.post("/api/createtask", {
          ...formData,
          grpId,
          workspaceId: params.id,
        });
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
                      name={member.firstName + " " + member.lastName}
                      sno={i + 1}
                      action="Remove"
                      email={member.email}
                      id={member._id}
                      key={i}
                      onClick={() => {
                        RemoveMember(member._id, formData);
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
