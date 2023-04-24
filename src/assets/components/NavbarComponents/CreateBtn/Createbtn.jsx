import React from "react";

//*CSS
import "./Createbtn.scss";

//*Icons
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "../../../utilities/Modal/Modal";
import useModal from "../../../utilities/Modal/useModal";
import CreateWorkspace from "../../CreateWorkspace/CreateWorkspace";

//*Components

const Createbtn = ({ className, onClick }) => {
  const { isShowing, toggle } = useModal();
  return (
    <>
      <div className={`createBtn ${className}`} onClick={toggle}>
        <AiOutlinePlus /> Create
      </div>
      <Modal
        isShowing={isShowing}
        hide={toggle}
        Content={<CreateWorkspace hide={toggle} />}
      />
    </>
  );
};

export default Createbtn;
