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

const TaskCard = ({ data }) => {
  const { isShowing, toggle } = useModal();
  return (
    <>
      <Modal
        Content={<TaskCardExpanded data={data} grpId={data.grpId} />}
        isShowing={isShowing}
        hide={toggle}
      />
      <div className="taskCard" onClick={toggle}>
        <div className="labelsContainer">
          {data?.taskTags.map((e, i) => (
            <Label key={i} text={e} bgColor={"#d63031"} />
          ))}
          {/* <Label text="Pending" bgColor={"#ff9900"} />
          <Label text="Completed" bgColor={"#00cec9"} />
          <Label text="Overdue" bgColor={"#636e72"} />
          <Label text="Frontend" bgColor={"#a29bfe"} /> */}
        </div>
        <h1>{data?.taskTitle}</h1>
        <p>{data?.taskDesc}</p>
        <div className="taskCard__footer">
          <span className="dueDate">
            {data?.dueDate &&
              new Intl.DateTimeFormat("en-US").format(new Date(data?.dueDate))}
          </span>
          <span className="assignees">
            {data?.assignees.map((e, i) => (
              <UserTextIcon key={i} text={e} bgColor={"#1ac888"} />
            ))}
            {/* <UserTextIcon text="AD" bgColor={"#f6c31c"} />
            <UserTextIcon text="V" bgColor={"#17c0eb"} /> */}
          </span>
        </div>
      </div>
    </>
  );
};

export default TaskCard;
