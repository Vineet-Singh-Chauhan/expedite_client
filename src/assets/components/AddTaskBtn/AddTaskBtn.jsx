import React from "react";
//*css
import "./AddTaskBtn.scss";
//*icons
import { AiOutlinePlus } from "react-icons/ai";
//*Components
import Modal from "../../utilities/Modal/Modal";
import useModal from "../../utilities/Modal/useModal";
import TaskCardExpanded from "../TaskCardExpanded/TaskCardExpanded";

const AddTaskBtn = ({ grpId }) => {
  const { isShowing, toggle } = useModal();
  return (
    <>
      <button className="createTask__btn" onClick={toggle}>
        <AiOutlinePlus /> Add Task
      </button>
      <Modal
        Content={<TaskCardExpanded grpId={grpId} />}
        isShowing={isShowing}
        hide={toggle}
      />
    </>
  );
};

export default AddTaskBtn;
