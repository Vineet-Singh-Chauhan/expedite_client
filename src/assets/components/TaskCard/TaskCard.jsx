import React, { lazy } from "react";
import useModal from "../../utilities/Modal/useModal";

//*CSS
import "./TaskCard.scss";
//*Components
const Label = lazy(() => import("../Label/Label"));
const Modal = lazy(() => import("../../utilities/Modal/Modal"));
const TaskCardExpanded = lazy(() =>
  import("../TaskCardExpanded/TaskCardExpanded")
);
const UserTextIcon = lazy(() => import("../UserTextIcon/UserTextIcon"));

const TaskCard = ({ data, grpId }) => {
  const { isShowing, toggle } = useModal();
  return (
    <>
      <Modal
        Content={<TaskCardExpanded data={data} grpId={grpId} hide={toggle} />}
        isShowing={isShowing}
        hide={toggle}
      />
      <div className="taskCard" onClick={toggle}>
        <div className="labelsContainer">
          {data?.taskTags.map((e, i) => (
            <Label text={e} key={i} formData={data} grpId={grpId} />
          ))}
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
              <UserTextIcon
                key={i}
                text={e.firstName[0].toUpperCase()}
                bgColor={"#1ac888"}
              />
            ))}
          </span>
        </div>
      </div>
    </>
  );
};

export default TaskCard;
