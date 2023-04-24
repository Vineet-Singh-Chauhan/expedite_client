import React from "react";
//*css
import "./MyTasks.scss";
//*Components
import DragNDrop from "../../components/DragNDrop/DragNDrop";

const data = [
  {
    title: "MyTasks",
    items: [1, 2, 3],
  },
  {
    title: "My tasks",
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
const MyTasks = () => {
  return (
    <div>
      <DragNDrop data={data} />
    </div>
  );
};

export default MyTasks;
