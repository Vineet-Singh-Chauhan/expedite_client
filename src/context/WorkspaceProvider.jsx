import { createContext, useState } from "react";

const WorkspaceContext = createContext({});

export const WorkspaceProvider = ({ children }) => {
  const [activeWorkspace, setActiveWorkSpace] = useState("");
  const [members, setMembers] = useState({});
  return (
    <WorkspaceContext.Provider value={{ activeWorkspace, setActiveWorkSpace }}>
      {children}
    </WorkspaceContext.Provider>
  );
};

export default WorkspaceContext;
