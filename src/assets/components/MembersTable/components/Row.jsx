import React, { lazy } from "react";
import { useParams } from "react-router-dom";
import useModal from "../../../utilities/Modal/useModal";
//*CSS
import "./Row.scss";
//*Components
const Modal = lazy(() => import("../../../utilities/Modal/Modal"));
const RemoveMemberConfirm = lazy(() =>
  import("../../SettingsComponents/RemoveMemberConfirm/RemoveMemberConfirm")
);

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
