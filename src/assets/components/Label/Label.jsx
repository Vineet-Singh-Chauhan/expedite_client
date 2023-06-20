import React from "react";

//*css
import "./Label.scss";
import { AiFillCloseCircle } from "react-icons/ai";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useParams } from "react-router-dom";
const Label = ({ text, bgColor, formData, grpId }) => {
  const axiosPrivate = useAxiosPrivate();
  const params = useParams();
  const handleRemoveLabel = async (e) => {
    // console.log(e.target);
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
