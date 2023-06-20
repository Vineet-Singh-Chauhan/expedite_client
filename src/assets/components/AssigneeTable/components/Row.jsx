import React from "react";
//*CSS
import "./Row.scss";
//*Components
import { useParams } from "react-router-dom";
const Row = ({ sno, email, name, action, onClick }) => {
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
        <button
          className=" userlist__actionBtn invitelist__actionBtn"
          onClick={onClick}
        >
          {action}
        </button>
      </td>
    </tr>
  );
};

export default Row;
