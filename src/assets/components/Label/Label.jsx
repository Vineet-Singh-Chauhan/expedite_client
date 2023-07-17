import React from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useParams } from "react-router-dom";

//*css
import "./Label.scss";
//*icons
import { AiFillCloseCircle } from "react-icons/ai";

const Label = ({ text, bgColor, formData, grpId }) => {
  const axiosPrivate = useAxiosPrivate();
  const params = useParams();
  const handleRemoveLabel = async (e) => {
    // e.stopPropagation();
    const newFormData = formData;
    newFormData.taskTags = newFormData.taskTags.filter((e) => e !== text);

    try {
      console.log(grpId);
      const response = await axiosPrivate.post("/api/createtask", {
        ...newFormData,
        grpId,
        workspaceId: params.id,
      });
      console.log(response.message);
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="taskLabel" data-tasktag={text}>
      {text}
      <div className="taskLabel__overlay" onClick={handleRemoveLabel}>
        <AiFillCloseCircle /> Remove
      </div>
    </div>
  );
};

export default Label;
