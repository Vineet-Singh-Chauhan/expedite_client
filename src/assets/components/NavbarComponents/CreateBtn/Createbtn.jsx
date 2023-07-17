import React, { lazy } from "react";
import useModal from "../../../utilities/Modal/useModal";

//*CSS
import "./Createbtn.scss";

//*Icons
import { AiOutlinePlus } from "react-icons/ai";

//*Components
const Modal = lazy(() => import("../../../utilities/Modal/Modal"));
const CreateWorkspace = lazy(() =>
  import("../../CreateWorkspace/CreateWorkspace")
);

const Createbtn = ({ className }) => {
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
