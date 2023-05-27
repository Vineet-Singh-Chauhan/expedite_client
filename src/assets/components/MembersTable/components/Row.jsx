import React from "react";
//*CSS
import "./Row.scss";
//*Components
import useModal from "../../../utilities/Modal/useModal";
import Modal from "../../../utilities/Modal/Modal";
import RemoveMemberConfirm from "../../SettingsComponents/RemoveMemberConfirm/RemoveMemberConfirm";
const Row = ({ sno, name, email, action, isAdmin }) => {
  const { isShowing, toggle } = useModal();
  return (
    <tr className="userlistTableRow">
      <td>{sno}</td>
      <td>{name}</td>
      <td>
        <a href={`mailto:${email}`}>{email}</a>
      </td>
      <td>
        {isAdmin && (
          <button className="userlist__actionBtn" onClick={toggle}>
            {action}
          </button>
        )}
        <Modal
          isShowing={isShowing}
          hide={toggle}
          Content={<RemoveMemberConfirm name={name} hide={toggle} />}
          name={name}
        />
      </td>
    </tr>
  );
};

export default Row;
