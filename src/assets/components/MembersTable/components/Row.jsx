import React from "react";
//*CSS
import "./Row.scss";
//*Components
import useModal from "../../../utilities/Modal/useModal";
import Modal from "../../../utilities/Modal/Modal";
import RemoveMemberConfirm from "../../SettingsComponents/RemoveMemberConfirm/RemoveMemberConfirm";
import { useParams } from "react-router-dom";
const Row = ({ sno, name, email, action, isAdmin, id }) => {
  const { isShowing, toggle } = useModal();
  const params = useParams();
  const workspaceId = params.id;
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
          Content={
            <RemoveMemberConfirm
              name={name}
              hide={toggle}
              workspaceId={workspaceId}
              userId={id}
            />
          }
          name={name}
        />
      </td>
    </tr>
  );
};

export default Row;
