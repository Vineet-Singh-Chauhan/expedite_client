import React, { useEffect, useRef, useState } from "react";
//*css
import "./TaskCardExpanded.scss";
//*Components
import Editable from "../../utilities/EditableInput/EditableInput";
import Input from "../../utilities/form/Input";
import { useParams } from "react-router-dom";
import EditableInputWithoutIcon from "../../utilities/EditableInput/EditableInputWithoutIcon";
import Label from "../Label/Label";
//*Icons
import { AiOutlineCheck, AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useWorkspace from "../../../hooks/useWorkspace";
import WorkspaceMembersTable from "../MembersTable/WorkspaceMembersTable";
import AssigneeTable from "../AssigneeTable/AssigneeTable";
// import { json } from "stream/consumers";

const TaskCardExpanded = ({ grpId, data, hide }) => {
  const inputRef = useRef();
  const taskTagsTrayRef = useRef();
  const addAssigneesTrayRef = useRef();
  const axiosPrivate = useAxiosPrivate();
  const params = useParams();
  const { activeWorkspace } = useWorkspace();
  const handleAddTag = () => {
    taskTagsTrayRef.current.style.display = "block";
  };
  const handleTagsTrayOverlayClick = () => {
    taskTagsTrayRef.current.style.display = "none";
  };
  const handleAddAssignees = () => {
    addAssigneesTrayRef.current.style.display = "block";
  };
  const handleaddAssigneesOverlayClick = () => {
    addAssigneesTrayRef.current.style.display = "none";
  };
  const [formData, setFormData] = useState(
    data || {
      taskTags: data?.taskTags || [],
      assignees: data?.assignees || [],
      taskStatus: data?.taskStatus || "Not Started",
    }
  );
  const [disabled, setDisabled] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (formData?.taskTitle) {
      try {
        console.log(grpId);
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
    hide();
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    console.log(data.id);
    const response = await axiosPrivate.post("/api/deletetask", {
      taskId: data.id,
      grpId,
      workspaceId: params.id,
    });
    hide();
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const addAttribute = (e) => {
    const attribute = e.target.getAttribute("name");
    const value = e.target.getAttribute("value");
    if (
      !formData[attribute].includes(value) &&
      !formData[attribute].some((e) => e.id == JSON.parse(value).id)
    ) {
      setFormData({
        ...formData,
        [attribute]: [
          ...formData[attribute],
          attribute === "assignees" ? JSON.parse(value) : value,
        ],
      });
    }
  };
  useEffect(() => {
    if (!formData?.taskTitle || formData?.taskTitle.trim() === "") {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [formData]);

  return (
    <div className="TaskCardExpanded">
      <form onSubmit={handleSubmit}>
        <div className="TaskCardExpanded__options">
          <button
            className="TaskCardExpanded__deleteBtn"
            onClick={handleDelete}
          >
            <AiOutlineDelete /> Delete
          </button>
          <button className="TaskCardExpanded__saveBtn" disabled={disabled}>
            <AiOutlineCheck /> Save
          </button>
        </div>
        <div className="TaskCardExpanded__header">
          <EditableInputWithoutIcon
            text={formData?.taskTitle}
            placeholder="Title of task"
            type="input"
            childRef={inputRef}
          >
            <input
              className="standardOneLineInput"
              type="text"
              name="taskTitle"
              placeholder="Title of task"
              ref={inputRef}
              onChange={handleChange}
              value={formData?.taskTitle || ""}
            />
          </EditableInputWithoutIcon>
          {/* <input type="checkbox" className="markCompleteCheckbox" /> */}
          <select
            className="taskStatus"
            name="taskStatus"
            onChange={handleChange}
            value={formData?.taskStatus || ""}
          >
            <option className="taskStatus__notStarted">Not Started</option>
            <option className="taskStatus__completed">Completed</option>
            <option className="taskStatus__review">Pending Review</option>
            <option className="taskStatus__dependency">
              Dependency Pending
            </option>
            <option className="taskStatus__overdue">Overdue</option>
            <option className="taskStatus__cancel">Cancelled</option>
          </select>
        </div>
        <div className="taskDesc">
          <EditableInputWithoutIcon
            text={formData?.taskDesc}
            placeholder="Description of task"
            type="input"
            childRef={inputRef}
          >
            <textarea
              rows="8"
              className="standardOneLineInput taskDescTextarea"
              type="text"
              name="taskDesc"
              placeholder="Description of task"
              ref={inputRef}
              onChange={handleChange}
              value={formData?.taskDesc || ""}
            />
          </EditableInputWithoutIcon>
        </div>
        <div className="taskTags">
          <div className="taskTags__header">
            <h3>Labels</h3>
            <div className="tasktags__relative">
              <div className="addTags__btn" onClick={handleAddTag}>
                <AiOutlinePlus /> Add Tag
              </div>
              <div className="taskTags__tray" ref={taskTagsTrayRef}>
                <div
                  name="taskTags"
                  value="high Priority"
                  onClick={addAttribute}
                >
                  High Priority
                </div>
                <div name="taskTags" value="Completed" onClick={addAttribute}>
                  Completed
                </div>
                <div name="taskTags" value="Pending" onClick={addAttribute}>
                  Pending
                </div>
                <div name="taskTags" value="Overdue" onClick={addAttribute}>
                  Overdue
                </div>
                <div
                  name="taskTags"
                  value="Dependency Pending"
                  onClick={addAttribute}
                >
                  Dependency Pending
                </div>
                <span
                  className="overlay"
                  onClick={handleTagsTrayOverlayClick}
                ></span>
              </div>
            </div>
          </div>
          <div className="labelContainer">
            {data?.taskTags.map((e, i) => (
              <Label text={e} key={i} formData={formData} grpId={grpId} />
            ))}
          </div>
        </div>
        <div className="dueDateContainer">
          Due Date :{" "}
          {formData?.dueDate &&
            new Intl.DateTimeFormat("en-US").format(new Date(data?.dueDate))}
          <input
            type="date"
            name="dueDate"
            className="standardOneLineInput"
            value={formData?.dueDate || ""}
            onChange={handleChange}
          />
        </div>
        <div className="addAssignees">
          <div className="addAssignees__header">
            <h3>Assignees</h3>
            <div className="addAssignees__button" onClick={handleAddAssignees}>
              <AiOutlinePlus /> Add Members
            </div>
            <div className="addAssignees__tray" ref={addAssigneesTrayRef}>
              {Array.from(activeWorkspace.members).map((e, i) => (
                <div
                  name="assignees"
                  key={i}
                  value={JSON.stringify({
                    id: e.id,
                    name: e.name,
                    email: e.email,
                  })}
                  onClick={addAttribute}
                >
                  {e.name}
                </div>
              ))}

              <span
                className="overlay"
                onClick={handleaddAssigneesOverlayClick}
              ></span>
            </div>
          </div>
          <div className="assigneesTable__container">
            <AssigneeTable
              members={data?.assignees}
              formData={formData}
              setFormData={setFormData}
              grpId={grpId}
            />
          </div>
        </div>
        {/* //TODO: IN LATER PHASE */}
        {/* <div className="taskComments">
        <div className="commentsArea"></div>
        <div className="commentInput__container"></div>
      </div> */}
      </form>
    </div>
  );
};

export default TaskCardExpanded;
