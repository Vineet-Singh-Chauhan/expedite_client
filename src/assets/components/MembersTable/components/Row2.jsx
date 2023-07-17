import React, { lazy } from "react";
import useModal from "../../../utilities/Modal/useModal";
import { useParams } from "react-router-dom";
//*CSS
import "./Row.scss";
//*Components
const Modal = lazy(() => import("../../../utilities/Modal/Modal"));
const CancelInvite = lazy(() =>
  import("../../SettingsComponents/CancelInvite/CancelInvite")
);

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
