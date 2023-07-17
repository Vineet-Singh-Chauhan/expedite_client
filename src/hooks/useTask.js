import { useContext } from "react";
import TaskContext from "../context/TaskProvider";

const useTask = () => {
  return useContext(TaskContext);
};

export default useTask;
