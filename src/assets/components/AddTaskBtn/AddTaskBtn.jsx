import React, { lazy } from "react";
import useModal from "../../utilities/Modal/useModal";
//*css
import "./AddTaskBtn.scss";
//*icons
import { AiOutlinePlus } from "react-icons/ai";
//*Components
const Modal = lazy(() => import("../../utilities/Modal/Modal"));
const TaskCardExpanded = lazy(() =>
  import("../TaskCardExpanded/TaskCardExpanded")
);

const AddTaskBtn = ({ grpId }) => {
  const { isShowing, toggle } = useModal();
  return (
    <>
      <button className="createTask__btn" onClick={toggle}>
        <AiOutlinePlus /> Add Task
      </button>
      <Modal
        Content={<TaskCardExpanded grpId={grpId} hide={toggle} />}
        isShowing={isShowing}
        hide={toggle}
      />
    </>
  );
};

export default AddTaskBtn;
