import { useContext } from "react";
import WorkspaceContext from "../context/WorkspaceProvider";

const useWorkspace = () => {
  return useContext(WorkspaceContext);
};

export default useWorkspace;
