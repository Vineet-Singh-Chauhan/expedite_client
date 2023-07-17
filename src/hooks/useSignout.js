import axios from "../api/axios";
import useAuth from "./useAuth";
import useWorkspace from "./useWorkspace";
const useSignout = () => {
  const { setAuth, setUser } = useAuth();
  const { setActiveWorkspace } = useWorkspace();
  const signout = async () => {
    setAuth();
    setUser();
    setActiveWorkspace();
    try {
      const response = await axios.post(
        "/api/signout",
        {},
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  return signout;
};

export default useSignout;
