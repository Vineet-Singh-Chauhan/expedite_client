import React from "react";
//*css
import "./WorkspaceTasks.scss";
import DragNDrop from "../../components/DragNDrop/DragNDrop";

const data = [
  {
    title: "Group1",
    items: [1, 2, 3],
  },
  {
    title: "Group2",
    items: [4, 5],
  },
  {
    title: "Group3",
    items: [4, 5],
  },
  {
    title: "Group1",
    items: [1, 2, 3],
  },
  {
    title: "Group2",
    items: [4, 5],
  },
  {
    title: "Group3",
    items: [4, 5],
  },
];
// const data =[];
const WorkspaceTasks = () => {
  return (
    <div>
      <DragNDrop data={data} />
    </div>
  );
};

export default WorkspaceTasks;
