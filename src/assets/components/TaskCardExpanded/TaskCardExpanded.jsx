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
import {
  AiOutlineCheck,
  AiOutlineDelete,
  AiOutlinePlus,
  AiOutlineRight,
  AiOutlineSave,
} from "react-icons/ai";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const TaskCardExpanded = ({ grpId }) => {
  const inputRef = useRef();
  const taskTagsTrayRef = useRef();
  const addAssigneesTrayRef = useRef();
  const axiosPrivate = useAxiosPrivate();
  const params = useParams();
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
  const [formData, setFormData] = useState({
    taskTags: [],
    assignees: [],
    taskStatus: "Not Started",
  });
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
  };
  const handleDelete = (e) => {
    e.preventDefault();
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };
  const addAttribute = (e) => {
    const attribute = e.target.getAttribute("name");
    const value = e.target.getAttribute("value");
    if (!formData[attribute].includes(value)) {
      setFormData({
        ...formData,
        [attribute]: [...formData[attribute], value],
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
            <Label text="pending" bgColor={"#d66400"} />
          </div>
          <div className="labelContainer">
            <Label text="High priority" bgColor={"#eb3941"} />
          </div>
        </div>
        <div className="dueDateContainer">
          Due Date :{" "}
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
            <button onClick={handleAddAssignees}>
              <AiOutlinePlus /> Add Members
            </button>
            <div className="addAssignees__tray" ref={addAssigneesTrayRef}>
              <div name="assignees" value="Vineet" onClick={addAttribute}>
                Vineet Singh Chauhan
              </div>
              <div name="assignees" value="Shyam" onClick={addAttribute}>
                Shyam Rangeela
              </div>
              <div>Vineet Singh Chauhan</div>
              <div>Shyam Rangeela</div>
              <div>Vineet Singh Chauhan</div>
              <div>Shyam Rangeela</div>
              <div>Vineet Singh Chauhan</div>
              <div>Shyam Rangeela</div>
              <span
                className="overlay"
                onClick={handleaddAssigneesOverlayClick}
              ></span>
            </div>
          </div>
          <div className="assigneesTable__container">
            <table className="assigneesTable">
              <thead>
                <tr>
                  <th>S No.</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="assigneesTableRow">
                  <td>1</td>
                  <td>Vineet</td>
                  <td>
                    <a href={`mailto:Vineetksc@gmail.com`}>
                      Vineetksc@gmail.com
                    </a>
                  </td>
                  <td>
                    <button className="assignees__actionBtn">
                      {/* onClick={toggle} */}
                      Remove
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
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
