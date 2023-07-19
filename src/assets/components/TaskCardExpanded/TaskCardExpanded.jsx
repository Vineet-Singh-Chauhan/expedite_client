import React, { lazy, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useWorkspace from "../../../hooks/useWorkspace";
import useTask from "../../../hooks/useTask";
import useAuth from "../../../hooks/useAuth";
import useSocket from "../../../hooks/useSocket";
//*css
import "./TaskCardExpanded.scss";
//*Components
const EditableInputWithoutIcon = lazy(() =>
  import("../../utilities/EditableInput/EditableInputWithoutIcon")
);
const Label = lazy(() => import("../Label/Label"));
const AssigneeTable = lazy(() => import("../AssigneeTable/AssigneeTable"));

//*Icons
import { AiOutlineCheck, AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";

const TaskCardExpanded = ({ grpId, data, hide }) => {
  const inputRef = useRef();
  const taskTagsTrayRef = useRef();
  const addAssigneesTrayRef = useRef();
  const axiosPrivate = useAxiosPrivate();
  const params = useParams();
  const { activeWorkspace } = useWorkspace();
  const { setList } = useTask();
  const { socket } = useSocket();
  const { user } = useAuth();
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
    if (formData?.taskTitle.trim()) {
      try {
        const response = await axiosPrivate.post("/api/createtask", {
          ...formData,
          grpId,
          workspaceId: params.id,
        });
        socket.emit("changeEmitted", {
          workspaceId: params.id,
          sender: user._id,
        });
        setList((oldList) => {
          const taskGrp = oldList.findIndex((ele) => ele._id === grpId);
          const index = oldList[taskGrp].tasks.findIndex(
            (ele) => ele._id === data?._id
          );
          if (index === -1) {
            oldList[taskGrp].tasks = [
              ...oldList[taskGrp].tasks,
              response?.data,
            ];
          }
          oldList[taskGrp].tasks[index] = { ...formData };
          return [...oldList];
        });
      } catch (err) {
        console.log(err.message);
      }
    }
    hide();
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    setDisabled(true);

    const response = await axiosPrivate.post("/api/deletetask", {
      taskId: data._id,
      grpId,
      workspaceId: params.id,
    });
    if (response?.status === 200) {
      socket.emit("changeEmitted", {
        workspaceId: params.id,
        sender: user._id,
      });
      setList((oldList) => {
        const taskGrp = oldList.findIndex((ele) => ele._id === grpId);
        const index = oldList[taskGrp].tasks.findIndex(
          (ele) => ele._id === data?._id
        );
        if (index === -1) {
          return oldList;
        }
        oldList[taskGrp].tasks.splice(index, 1);
        return [...oldList];
      });
    }
    setDisabled(false);

    hide();
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
  const addAssignees = (e) => {
    const value = e.target.getAttribute("value");
    if (!formData["assignees"].includes(value)) {
      setFormData({
        ...formData,
        assignees: [
          ...formData["assignees"],
          activeWorkspace.members.find((e) => e._id === value),
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
            {formData?.taskTags.map((e, i) => (
              <Label text={e} key={i} formData={formData} grpId={grpId} />
            ))}
          </div>
        </div>
        <div className="dueDateContainer">
          Due Date :
          {formData?.dueDate &&
            new Intl.DateTimeFormat("en-US").format(
              new Date(formData?.dueDate)
            )}
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
                  value={e._id}
                  onClick={addAssignees}
                >
                  {e.firstName + " " + e.lastName}
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
              members={formData?.assignees}
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
