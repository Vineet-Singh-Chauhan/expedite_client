import React from "react";
//*CSS
import "./RemoveMemberConfirm.scss";
//*Components
import MainButton from "../../../utilities/MainButton/MainButton";
const RemoveMemberConfirm = ({ name, hide }) => {
  const handleRemove = () => {};
  return (
    <div className="RemoveMemberConfirmModal">
      <h2> Remove Member ?</h2>
      <p>Are you sure to remove {name} from this workspace ?</p>
      <div className="RemoveMemberConfirmModal__btnGrp">
        <MainButton className="mx-auto" title="Yes" onClick={handleRemove} />
        <MainButton className="mx-auto" title="Cancel" onClick={hide} />
      </div>
    </div>
  );
};

export default RemoveMemberConfirm;
