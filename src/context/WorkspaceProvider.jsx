import { createContext, useState } from "react";

const WorkspaceContext = createContext({});

export const WorkspaceProvider = ({ children }) => {
  const [activeWorkspace, setActiveWorkspace] = useState("");
  const [members, setMembers] = useState({});
  return (
    <WorkspaceContext.Provider
      value={{ activeWorkspace, setActiveWorkspace, members, setMembers }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};

export default WorkspaceContext;
