import React from "react";
//*CSS
import "./Row.scss";
//*Components
import useModal from "../../../utilities/Modal/useModal";
import Modal from "../../../utilities/Modal/Modal";
import RemoveMemberConfirm from "../../SettingsComponents/RemoveMemberConfirm/RemoveMemberConfirm";
import { useParams } from "react-router-dom";
import CancelInvite from "../../SettingsComponents/CancelInvite/CancelInvite";
const Row2 = ({ sno, email, action, isAdmin }) => {
  const { isShowing, toggle } = useModal();
  const params = useParams();
  const workspaceId = params.id;
  return (
    <tr className="userlistTableRow">
      <td>{sno}</td>
      <td>
        <a href={`mailto:${email}`}>{email}</a>
      </td>
      <td>
        {isAdmin && (
          <button
            className=" userlist__actionBtn invitelist__actionBtn"
            onClick={toggle}
          >
            {action}
          </button>
        )}
        <Modal
          isShowing={isShowing}
          hide={toggle}
          Content={
            <CancelInvite
              hide={toggle}
              workspaceId={workspaceId}
              email={email}
            />
          }
        />
      </td>
    </tr>
  );
};

export default Row2;
