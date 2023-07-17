import { createContext, useState } from "react";
const TaskContext = createContext({});

export const TaskProvider = ({ children }) => {
  const [list, setList] = useState([]);

  return (
    <TaskContext.Provider value={{ list, setList }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
