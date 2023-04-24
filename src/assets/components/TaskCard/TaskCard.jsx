import React from "react";

//*CSS
import "./TaskCard.scss";
//*Components
import Label from "../Label/Label";
import Modal from "../../utilities/Modal/Modal";
import useModal from "../../utilities/Modal/useModal";
import TaskCardExpanded from "../TaskCardExpanded/TaskCardExpanded";

//*Icons
import UserTextIcon from "../UserTextIcon/UserTextIcon";

const TaskCard = () => {
  const { isShowing, toggle } = useModal();
  return (
    <>
      <Modal
        Content={<TaskCardExpanded />}
        isShowing={isShowing}
        hide={toggle}
      />
      <div className="taskCard" onClick={toggle}>
        <div className="labelsContainer">
          <Label text="high Priority" bgColor={"#d63031"} />
          <Label text="Pending" bgColor={"#ff9900"} />
          <Label text="Completed" bgColor={"#00cec9"} />
          <Label text="Overdue" bgColor={"#636e72"} />
          <Label text="Frontend" bgColor={"#a29bfe"} />
        </div>
        <h1>Title of task</h1>
        <p>
          Desc of task Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Odit, quos.{" "}
        </p>
        <div className="taskCard__footer">
          <span className="dueDate">Apr 22, 11:59PM</span>
          <span className="assignees">
            <UserTextIcon text="VSC" bgColor={"#1ac888"} />
            <UserTextIcon text="AD" bgColor={"#f6c31c"} />
            <UserTextIcon text="V" bgColor={"#17c0eb"} />
          </span>
        </div>
      </div>
    </>
  );
};

export default TaskCard;
